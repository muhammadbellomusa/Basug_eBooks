import React, { useState, useEffect, useLayoutEffect, useContext , useRef } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import useVoiceRecognitionScreen from '../useVoiceRecognitionScreen';
import { Alert } from 'react-native';




const ELearning = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [uploading, setUploading] = useState(false);
  const { colors } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();





  const allowedEmails = ["h@gmail.com", "csc@basug.com", "mth@basug.com", "bio@basug.com","pharm@basug.com",
  "econ@basug.com", "ana@basug.com", "phy@basug.com", "chm@basug.com","eng@basug.com",
  "agr@basug.com", "law@basug.com", "hau@basug.com", "ara@basug.com", "isl@basug.com",
  "edu@basug.com", "soc@basug.com", "pbh@basug.com", "pol@basug.com", "bam@basug.com",
  "pba@basug.com", "phc@basug.com", "lis@basug.com", "slt@basug.com", "mcb@basug.com",
  "bch@basug.com"
        ];




  useLayoutEffect(()=>{
    navigation.setOptions({
      title: "eLearning",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <View>
            <TouchableOpacity style={{ flexDirection: "row-reverse", justifyContent: "center", alignItems: "center" }}>
              <Text>{recognizedText}</Text>
              <FontAwesome5.Button
                name="microphone"
                size={24}
                style={{ backgroundColor: "orange" }}
                color="blue"
                borderRadius={30}
                backgroundColor="whitesmoke"
                onPress={startListening}
              />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  // Function to handle video selection from local storage
  const selectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri);
      setVideoName(result.uri.split('/').pop());
    }
  };

  // Function to upload the selected video to Firebase Storage
  const uploadVideo = async () => {
    if (!videoUri) {
      return;
    }

    setUploading(true);
    try {
      const response = await fetch(videoUri);
      const blob = await response.blob();

      const storageRef = firebase.storage().ref(`generalVideos/${videoName}`);
      await storageRef.put(blob);

      const downloadUrl = await storageRef.getDownloadURL();

      // Save the download URL to Firestore database
      await firebase.firestore().collection('generalVideos').add({
        name: videoName,
        url: downloadUrl,
      });

      // Clear videoUri and videoName after successful upload
      setVideoUri(null);
      setVideoName('');
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
      Alert.alert(`Content uploaded,${videoName} uploaded successfully`)
    }
  };

  // Function to retrieve all videos from the 'generalVideos' collection
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('generalVideos')
      .onSnapshot(querySnapshot => {
        const videoData = [];
        querySnapshot.forEach(doc => {
          videoData.push({ id: doc.id, ...doc.data() });
        });
        setVideos(videoData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  // Function to delete a video
  const handleDelete = async (videoId, videoName) => {
    try {
      await firebase.firestore().collection('generalVideos').doc(videoId).delete();
      // Also delete the video from Firebase Storage
      const storageRef = firebase.storage().ref(`generalVideos/${videoName}`);
      await storageRef.delete();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Text style={{ textAlign: 'center', backgroundColor: 'yellow', height: 27, fontSize: 20, color: 'navy' }}>eLearning</Text>
      
      {/* Button to select video from local storage */}
      {allowedEmails.includes(user.email) ? (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Button title="Select Video" onPress={selectVideo} />
      </View>
         ) : null}
      {/* Text input to enter video name */}
      {allowedEmails.includes(user.email) ? (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <TextInput
            style={styles.videoNameInput}
            value={videoName}
            onChangeText={setVideoName}
            placeholder="Enter Video Name"
            placeholderTextColor="gray"
          />
        </View>
       ) : null}

      {/* Button to upload the selected video */}
      {videoUri && (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          {uploading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Button title="Upload Video" onPress={uploadVideo} />
          )}
        </View>
      )}

      {/* FlatList to display the videos */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.videoContainer}>
                <Video
                  source={{ uri: item.url }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={false}
                  useNativeControls
                  style={styles.video}
                />
                <View style={styles.videoInfo}>
                  <Text style={styles.videoName}>{item.name}</Text>
                  {allowedEmails.includes(user.email) ? (
                    <TouchableOpacity style={styles.deleteButton}
                      onPress={() => Alert.alert("Delete", "Are you sure you want to delete?", [
                        { text: "yes", onPress: () => handleDelete(item.id, item.name) },
                        { text: "no", style: 'cancel' }
                      ])}>
                      <FontAwesome5 name="trash" size={18} color="white" />
                    </TouchableOpacity>
                    ) : null}
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
  },
  videoName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  videoNameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    color: 'black',
    fontSize: 16,
  },
});

export default ELearning;

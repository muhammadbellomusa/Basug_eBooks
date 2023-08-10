// LevelScreen.js
import React, { useLayoutEffect, useContext, useRef, useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator ,TouchableOpacity, StyleSheet,ScrollView,Alert} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useVoiceRecognitionScreen from "./useVoiceRecognitionScreen";
import * as DocumentPicker from 'expo-document-picker';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import { Linking } from 'react-native';
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const LevelScreen = ({navigation, route }) => {
  const { selectedCourse, selectedLevel } = route.params;
  const { user, logout } = useContext(AuthContext);
  const [pdfName, setPDFName] = useState('');
  const [pdfUri, setPDFUri] = useState('');
  const [uploading, setUploading] = useState(false);
  const uploadTaskRef = useRef(null);
  const [pdfs, setPDFs] = useState([]);
  const { colors } = useTheme();
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();
  // const navigation = useNavigation();


  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  

  const schedulePushNotificationsToAllUsers = async () => {
    try {
      // Fetch all user documents from Firestore
      const usersSnapshot = await firestore().collection('users').get();

      // Loop through each user and send a notification
      usersSnapshot.forEach(async (doc) => {
        const { expoPushToken } = doc.data();

        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `A new Course Added`,
              body: `New course added at ${selectedCourse} level ${selectedLevel}`,
              data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
            to: expoPushToken,
          });

          console.log(`Notification sent successfully to user with token: ${expoPushToken}`);
        } catch (error) {
          console.log(`Error sending notification to user with token ${expoPushToken}:`, error);
        }
      });

      console.log('Notifications sent to all users.');
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  // ... (rest of the code)


 
  
  const UploadPDF = async ()=>{
     await handleUploadPDF();
    
    await schedulePushNotificationsToAllUsers(); 
  
    
  }
  
  
  




  const handleDiscussionForumNavigation = () => {
    navigation.navigate('DiscussionForumScreen', {
      selectedCourse: selectedCourse,
      selectedLevel: selectedLevel,
    });
  };
  
  
  bs = React.createRef();
  fall = new Animated.Value(1);

  const allowedEmails = ["h@gmail.com", "csc@basug.com", "mth@basug.com", "bio@basug.com","pharm@basug.com",
                          "econ@basug.com", "ana@basug.com", "phy@basug.com", "chm@basug.com","eng@basug.com",
                          "agr@basug.com", "law@basug.com", "hau@basug.com", "ara@basug.com", "isl@basug.com",
                          "edu@basug.com", "soc@basug.com", "pbh@basug.com", "pol@basug.com", "bam@basug.com",
                          "pba@basug.com", "phc@basug.com", "lis@basug.com", "slt@basug.com", "mcb@basug.com",
                          "bch@basug.com"
                        ];


  useLayoutEffect(()=>{
    navigation.setOptions({
      title:  [selectedCourse, " ", "level", "  ", selectedLevel],
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
             {allowedEmails.includes(user.email) ? (
                <TouchableOpacity>
                    <FontAwesome5Icon.Button
                        name="upload"
                        size={22}
                        backgroundColor="orange"
                        color="navy"
                        onPress={() => bs.current.snapTo(0)}
                      />
                    </TouchableOpacity>
                  ) : null}

          <View><TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"orange"}}
            color="navy"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />
        </TouchableOpacity>
</View>
                  </View>
      ),
    });
  },[navigation]);


  const renderInner = () => (
    <View style={[styles.panel, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: "center", marginBottom: -35 }}>
        <Text style={[styles.panelTitle, { color: colors.text }]}>
          Upload a PDF
        </Text>
        <Text style={[styles.panelSubtitle, { color: colors.text }]}>
          Upload a PDF
        </Text>
      </View>
      <View>
      <TextInput
        value={pdfName}
        onChangeText={setPDFName}
        placeholder="PDF Name"
        style={{borderWidth:1,padding:5,borderRadius:12}}
      />
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={handlePickPDF}>
        <Text style={styles.panelButtonTitle}>Select a PDF</Text>
      </TouchableOpacity>
      {pdfName ? <Text>Selected PDF: {pdfName}</Text> : null}
      {uploading ? (
        <View style={{margin:8}}>
          <ActivityIndicator size="large" />
          <TouchableOpacity style={styles.panelButton} onPress={handleCancelUpload}>
        <Text style={styles.panelButtonTitle}>cancel upload</Text>
      </TouchableOpacity>

        </View>
      ) : null}
    
      <TouchableOpacity style={styles.panelButton} onPress={UploadPDF}>
        <Text style={styles.panelButtonTitle}>Upload</Text>
      </TouchableOpacity>
     
          <TouchableOpacity
        style={[styles.panelButton, { backgroundColor: "#ff7f50" }]}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
     
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View
        style={[styles.panelHeader, { backgroundColor: colors.background }]}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(selectedCourse)
      .where('selectedCourse', '==', selectedCourse)
      .where('selectedLevel', '==', selectedLevel)
      .onSnapshot((querySnapshot) => {
        const pdfList = [];
        querySnapshot.forEach((doc) => {
          const { name, downloadUrl } = doc.data();
          const id = doc.id;
          pdfList.push({ id, name, downloadUrl });
        });
        setPDFs(pdfList);
      });
  
    return () => unsubscribe();
  }, [selectedCourse, selectedLevel]);
  


  const handleDelete = async (pdfId, pdfName, downloadUrl) => {
    try {
      console.log("DownloadURL: ", downloadUrl);
  
      // Delete the PDF document from Firestore
      await firestore().collection(selectedCourse).doc(pdfId).delete();
      console.log('PDF deleted from Firestore successfully!');
  
      // Delete the PDF from Firebase Storage if the downloadUrl is available and valid
      if (downloadUrl) {
        const storageRef = storage().refFromURL(downloadUrl);
        const exists = await storageRef.getDownloadURL().then(() => true).catch(() => false);
  
        if (exists) {
          await storageRef.delete();
          console.log('PDF deleted from storage successfully!');
        } else {
          console.log('PDF not found in storage. Skipping deletion from storage.');
        }
      } else {
        console.log('No downloadUrl found in the Firestore document. Skipping deletion from storage.');
      }
  
      // Update the state to remove the deleted PDF from the screen
      setPDFs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
  
      console.log('PDF deletion process completed!');
    } catch (error) {
      console.log('Error deleting PDF:', error.message);
      // You can display an error message to the user here if needed.
    }
  };
  
  
  
  





  const handlePickPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        // type: [DocumentPicker.types.pdf], // Only allow PDF files
      });

      if (res) {
        setPDFName(res.name);
        setPDFUri(res.uri);
      }
    } catch (error) {
      console.log('Error picking PDF:', error);
    }
  };

  const handleUploadPDF = async () => {
    if (pdfName && pdfUri) {
      try {
        setUploading(true);
  
        const storageRef = storage().ref(`${selectedCourse}/${pdfName}`);
        const uploadTask = storageRef.putFile(pdfUri);
        uploadTaskRef.current = uploadTask;
  
        await uploadTask;
  
        // Get the download URL with the 'gs://' prefix
        const downloadUrl = await storageRef.getDownloadURL();
        const gsDownloadUrl = `gs://${storageRef.bucket}/${storageRef.fullPath}`;
        console.log('Download URL:', gsDownloadUrl); // Check the URL format
  
        // Add selectedCourse and selectedLevel information to the document
        await firestore().collection(selectedCourse).add({
          name: pdfName,
          downloadUrl: gsDownloadUrl, // Save the 'gs://' URL in Firestore
          selectedCourse: selectedCourse,
          selectedLevel: selectedLevel,
        });
  
        console.log('PDF uploaded successfully!');
        Alert.alert(
          'PDF uploaded!',
          `${pdfName} has been uploaded to ${selectedCourse} level ${selectedLevel} successfully.`
        );
      } catch (error) {
        console.log('Error uploading PDF:', error);
        alert('Error uploading PDF', error);
      } finally {
        setUploading(false);
      }
    }
  };
  
  const handleDownloadPDF = async (downloadUrl) => {
    try {
      // Get the direct download URL of the PDF file from Firebase Storage
      const directDownloadUrl = await storage().refFromURL(downloadUrl).getDownloadURL();
  
      // Use Linking to open the PDF link in the user's default PDF viewer
      Linking.openURL(directDownloadUrl);
    } catch (error) {
      console.log('Error downloading PDF:', error);
      // You can display an error message to the user here if needed.
    }
  };
  
  
  
  

  const handleCancelUpload = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
      setUploading(false);
      console.log('Upload canceled');
    }
  };


  // useEffect(() => {
  //   // Fetch the user's data from Firestore using the current user's UID
  //   const fetchUserData = async () => {
  //     try {
  //       const uid = auth().currentUser.uid;
  //       const userDoc = await firestore().collection('users').doc(uid).get();
  //       const userData = userDoc.data();
        
  //       if (userData.course !== selectedCourse) {
  //         // Access the course field and log it to the console
  //         navigation.goBack();
  //         Alert.alert("Restricted Level!!!", "You are not authorized to this course and level please go back to your Department and select your Level");
          
  //       } else {
  //         console.log('User data not found.');
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user data:', error.message);
  //     }
  //   };

    

  //   // Call the function to fetch user data
  //   fetchUserData();
  // }, [selectedCourse, user]); // Empty dependency array ensures this useEffect runs only once on component mount.




  return (
    <View behavior="height" style={styles.container}>
<BottomSheet
ref={bs}
snapPoints={[330, 0]}
renderContent={renderInner}
renderHeader={renderHeader}
initialSnap={1}
callbackNode={fall}
enabledGestureInteraction={true}
/>
<Animated.View
style={{
  margin: 20,
  opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
}}
>
<TouchableOpacity activeOpacity={0.8} style={{backgroundColor:"#007BFF", padding:11, borderRadius:8,
        width:Dimensions.get("window").width / 1.1,alignItems:"center",
        alignSelf:"center",justifyContent:"space-evenly",flexDirection:"row"}} 
        onPress={handleDiscussionForumNavigation}>
          <Text style={{color:"white"}}>{selectedCourse} level  {selectedLevel}  Discussion Forum</Text>

          <Ionicons
                name="caret-down"
                size={20}
                style={{marginHorizontal:10,borderRadius:30}}
                color="navy"
                borderRadius={30}
                backgroundColor="#007BFF"
                
              />
        </TouchableOpacity>

</Animated.View>

<View >
  
<ScrollView showsVerticalScrollIndicator={false}>

    {pdfs.map((pdf, index) => (
    
<View style={{margin:15,flexDirection:"row",justifyContent:"space-between"}} key={index}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => handleDownloadPDF(pdf.downloadUrl)}
         style={{borderWidth:1,borderColor:"#ff7f50", borderRadius:15, padding:10,backgroundColor:"pink"}}>        
          <Text key={index}style={{color:"black",width:250}} >{pdf.name}</Text>
          
        </TouchableOpacity>
        {allowedEmails.includes(user.email) ? (
        <FontAwesome5.Button
                name="trash"
                size={22}
                style={{marginHorizontal:10,borderRadius:30}}
                color="#fff"
                borderRadius={30}
                backgroundColor="#ff7f50"
                onPress={()=> Alert.alert("Delete?", `Are you sure you want to delete this pdf?${pdf.name}`,[
                  {text:"yes", onPress: () => handleDelete(pdf.id, pdf.name, pdf.downloadUrl)},
                  {text:"no", style:"cancel"}
                  ]) }
              />
             ) : null }
        </View>
      ))
      
      
      }

        
       

</ScrollView>
    </View>

</View>

    
  );
};

export default LevelScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "brown",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "white",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "white",
    shadowColor: "#333333",
    elevation: 8,
    shadowOffset: { width: -1, height: 3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "grey",
    height: 30,
    marginBottom: 30,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "brown",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",

    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",

    justifyContent: "flex-end",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
})



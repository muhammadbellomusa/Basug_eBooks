import React, { useState, useEffect, useContext,useLayoutEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import { Alert } from 'react-native';
import { Avatar } from "@rneui/themed";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useVoiceRecognitionScreen from "./useVoiceRecognitionScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});








const ForumScreen = ({ navigation, route}) => {
  const { selectedCourse, selectedLevel } = route.params;
  const { user } = useContext(AuthContext);
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false); 
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `A new Discussion Added`,
        body: `New Discussion at ${selectedCourse} level ${selectedLevel}`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  
  

  
  const handleNewThread = async () => {
    try {
      await createNewThread();
      await schedulePushNotification();
 // Replace 'YourNextScreen' with the actual screen name
    } catch (error) {
      console.log('Error creating new thread:', error);
      // Handle the error or show an error message to the user
    }
  };
  







  
  const navigateToELearning = () => {
    navigation.navigate('ELearningScreen', {
      selectedCourse: selectedCourse,
      selectedLevel: selectedLevel,
    });
  };
  

  useLayoutEffect(()=>{
  
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >

          <View><TouchableOpacity style={{ flexDirection: "row-reverse", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"#007BFF"}}
            color="blue"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />

            <Ionicons 
            name="videocam"
            size={28}
            style={{backgroundColor:"#007BFF",marginRight:4,marginLeft:20}}
            color="black"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={navigateToELearning}
          />

        </TouchableOpacity>
            </View>
                  </View>
      ),
    
    });
  },[navigation]);





  useEffect(() => {
    const threadRef = firestore().collection('threads')
      .where('course', '==', selectedCourse)
      .where('level', '==', selectedLevel);

    const unsubscribe = threadRef.onSnapshot((querySnapshot) => {
      const threadList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        threadList.push({ id: doc.id, ...data });
      });
      setThreads(threadList);
    });

    return () => unsubscribe();
  }, [selectedCourse, selectedLevel]);


  const createNewThread = async () => {
    try {
      const lecturerName = userData
      ? `${userData.fname || selectedCourse} ${userData.lname || "Lecturer"}`
      : `${selectedCourse} " " Lecturer"`;

      const lecturerAvatar = userData
      ? { uri: userData.userImg || "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png" }
      : require('../assets/student_avatar.png');

      const newThread = {
        title: newThreadTitle,
        lecturer: { name: lecturerName, avatar: lecturerAvatar },
        replies: [],
        course: selectedCourse,
        level: selectedLevel,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      // Add the new thread to Firestore
      // await firestore().collection('threads').add(newThread);
      const newThreadRef = await firestore().collection('threads').add(newThread);


      // Clear the input and update the threads state
      setNewThreadTitle('');
      // setThreads([...threads, newThread]);
      setThreads((prevThreads) => [...prevThreads, { id: newThreadRef.id, ...newThread }]);
    } catch (error) {
      console.log('Error creating new thread:', error);
    }
  };

  const toggleReplyInput = (threadId) => {
    setShowReplyInput(!showReplyInput);
    setSelectedThreadId(threadId);
    setReplyText('');
  };

  const addReply = async () => {
    try {
      const studentName = userData
        ? `${userData.fname} ${userData.lname || user.email}`
        : `${selectedCourse} ${user.email}`;
  
      const studentAvatar = userData
        ? { uri: userData.userImg || "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png" }
        : require('../assets/student_avatar.png');
  
      const newReply = {
        text: replyText,
        student: { name: studentName, avatar: studentAvatar },
        createdAt: firestore.Timestamp.now(),
      };
  
      const threadRef = firestore().collection('threads').doc(selectedThreadId);
      
      // Use a transaction to update the replies array
      await firestore().runTransaction(async (transaction) => {
        const threadDoc = await transaction.get(threadRef);
  
        if (threadDoc.exists) {
          const updatedReplies = [...threadDoc.data().replies, newReply];
          transaction.update(threadRef, { replies: updatedReplies });
        }
      });
    } catch (error) {
      console.log('Error adding reply:', error);
    } finally {
      toggleReplyInput('');
    }
  };
  
  // Add this new useEffect hook to update the local state when replies change in Firestore
  useEffect(() => {
    const unsubscribe = firestore().collection('threads').doc(selectedThreadId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const updatedThread = snapshot.data();
          setThreads((prevThreads) =>
            prevThreads.map((thread) =>
              thread.id === selectedThreadId ? { ...thread, replies: updatedThread.replies } : thread
            )
          );
        }
      });
  
    return () => unsubscribe();
  }, [selectedThreadId]);
  

  const toggleExpandThread = (threadId) => {
    setSelectedThreadId((prevThreadId) => (prevThreadId === threadId ? '' : threadId));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.6}  style={styles.threadItem} onPress={() => toggleExpandThread(item.id)}>
      <View style={styles.threadHeader}>
        <Image source={item.lecturer.avatar || require("../assets/student_avatar.png")} style={styles.avatar} />
        <Text style={styles.lecturerName}>{item.lecturer.name}</Text>
      </View>
      <Text style={styles.threadTitle}>{item.title}</Text>
      {item.createdAt && item.createdAt.toDate && typeof item.createdAt.toDate === 'function' && (
  <Text>
    {format(item.createdAt.toDate(), 'MMMM dd, yyyy hh:mm a ')}
  </Text>
)}

      <Text style={styles.replyCount}>{`${item.replies.length} Replies`}</Text>
      {selectedThreadId === item.id && (
        <>
          {item.replies.map((reply) => (
            <View key={reply.id} style={styles.replyContainer}>
              <View style={styles.replyHeader}>
                <Image source={reply.student.avatar  || require("../assets/student_avatar.png")} style={styles.avatar} />
                <Text style={styles.studentName}>{reply.student.name}</Text>
              </View>
              <Text style={styles.replyText}>{reply.text}</Text>
              {item.createdAt && item.createdAt.toDate && typeof item.createdAt.toDate === 'function' && (
  <Text style={{fontSize:12, fontStyle:"italic"}}>
    {format(item.createdAt.toDate(), 'MMMM dd, yyyy hh:mm a ')}
  </Text>
)}
            </View>
          ))}
          {showReplyInput && selectedThreadId === item.id && (
            <View style={styles.replyInputContainer}>
              <TextInput
                style={styles.replyInput}
                value={replyText}
                onChangeText={(text) => setReplyText(text)}
                placeholder="Type your reply"
              />
              <TouchableOpacity style={styles.replyButton} onPress={addReply}>
                <Text style={styles.buttonText}>Reply</Text>
              </TouchableOpacity>
            </View>
          )}
          {!showReplyInput && (
            <TouchableOpacity style={styles.replyTextContainer} onPress={() => toggleReplyInput(item.id)}>
              <Text style={styles.replyTextLink}>Reply to this thread</Text>
            </TouchableOpacity>
          )}
        </>
      )}
     
      {user && (
         
        <View style={styles.buttonsContainer}>
           {allowedEmails.includes(user.email) ? (             
          <TouchableOpacity 
          style={{padding:10,borderWidth:1,borderColor:"orange",width:70,
          borderRadius:10,marginTop:3,marginBottom:20}}
          
          onPress={()=>Alert.alert("Delete Discussion", "Are you sure you want to delete this discussion?" ,[
            {text:"yes", onPress:() => deleteThread(item.id)},
            {text:"no", style:'cancel'}
          ])}>
            <Text style={{color:"red",textAlign:"center"}}>Delete</Text>
          </TouchableOpacity>
          ) : null }
          <View style={{borderBottomWidth:0.3,borderBottomColor:"#cccccc"}}></View>
        </View>
      )}
    </TouchableOpacity>
  );

  const deleteThread = async (threadId) => {
    try {
      // Remove the thread from Firestore
      await firestore().collection('threads').doc(threadId).delete();

      // Update the state by filtering out the deleted thread
      setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== threadId));
    } catch (error) {
      console.log('Error deleting thread:', error);
    }
  };

  const allowedEmails = ["h@gmail.com", "csc@basug.com", "mth@basug.com", "bio@basug.com","pharm@basug.com",
          "econ@basug.com", "ana@basug.com", "phy@basug.com", "chm@basug.com","eng@basug.com",
          "agr@basug.com", "law@basug.com", "hau@basug.com", "ara@basug.com", "isl@basug.com",
          "edu@basug.com", "soc@basug.com", "pbh@basug.com", "pol@basug.com", "bam@basug.com",
          "pba@basug.com", "phc@basug.com", "lis@basug.com", "slt@basug.com", "mcb@basug.com",
          "bch@basug.com"
                ];

useEffect(() => {
  const getUser = async () => {
    try {
      let userId;
      if (route.params && route.params.userId) {
        userId = route.params.userId;
      } else if (user && user.uid) {
        userId = user.uid;
      } else {
        console.log("No userId found.");
        return;
      }

      console.log("Fetching user data for userId:", userId);

      const documentSnapshot = await firestore()
        .collection("users")
        .doc(userId)
        .get();

      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();
        console.log("User data fetched:", userData);
        setUserData(userData);
      } else {
        console.log("User data not found for userId:", userId);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setUserDataLoaded(true);
    }
  };

  getUser();
}, [route.params, user]);

useEffect(() => {
  // console.log("User data:", userData);
}, [userData]);


useEffect(() => {
  // console.log("User data:", userData);
}, [userData]);
 

  useEffect(() => {
    // Log userData after it's fetched
    // console.log("User data:", userData);
  }, [userData]);

  useEffect(() => {
    // This will be triggered when the component comes into focus
    navigation.addListener("focus", () => {
      // Refresh the data
      setUserDataLoaded(false);
      setUserData(null);
    });
  }, [navigation]);

  useEffect(() => {
    // Log userData after it's fetched
    // console.log("User data:", userData);
    setLoading(false); // Set loading to false once data is fetched
  }, [userData]);


  return (
    <View style={styles.container}>
      <FlatList 
        data={threads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No Discussions yet</Text>}
        showsVerticalScrollIndicator={false}

      />
       {allowedEmails.includes(user.email) ? (
      <View style={styles.newThreadContainer}>
        <TextInput
          style={styles.newThreadInput}
          value={newThreadTitle}
          onChangeText={(text) => setNewThreadTitle(text)}
          placeholder="Enter your topic for discussion"
        />
        <TouchableOpacity style={styles.newThreadButton} onPress={handleNewThread}>
          <Text style={styles.buttonText}>Create a Forum</Text>
        </TouchableOpacity>
      </View>
       ) : null }

           </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  threadItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  threadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  lecturerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  threadTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 4,
  },
  replyCount: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  replyContainer: {
    marginBottom: 8,
    paddingLeft: 28,
    borderLeftWidth: 2,
    borderColor: '#ccc',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  replyText: {
    fontSize: 14,
    color: '#444',
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  replyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  replyTextContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  replyTextLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize:15,
  },
  newThreadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  newThreadInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  newThreadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
});

export default ForumScreen;

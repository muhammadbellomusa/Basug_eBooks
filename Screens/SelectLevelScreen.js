// SelectLevelScreen.js
import React, { useContext, useEffect } from 'react';
import { View, Button, TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { AuthContext } from '../navigation/AuthProvider';



const SelectLevelScreen = ({ navigation, route }) => {
  const { selectedCourse } = route.params;
const {colors} = useTheme();
  const handleLevelSelection = (selectedLevel) => {
    navigation.navigate('Level', { selectedCourse, selectedLevel });
  };

  const {  selectedLevel } = route.params;
  const { user, logout } = useContext(AuthContext);

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
    <View style={{marginTop:20}}>
        <TouchableOpacity  
        activeOpacity={0.5}
        style={{
          borderWidth: 2,
          borderColor: "#ff7f50",
          borderRadius: 15,
          height: 40,
          justifyContent: "center",
          margin:17
        }}  
         onPress={() => handleLevelSelection(1)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>Level 1</Text>
        </TouchableOpacity>


      <TouchableOpacity 
      activeOpacity={0.5}
      style={{
          borderWidth: 2,
          borderColor: "#ff7f50",
          borderRadius: 15,
          height: 40,
          justifyContent: "center",
          margin:17
        }}   onPress={() => handleLevelSelection(2)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>Level 2</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        activeOpacity={0.5}
        style={{
          borderWidth: 2,
          borderColor: "#ff7f50",
          borderRadius: 15,
          height: 40,
          justifyContent: "center",
          margin:17
        }}   onPress={() => handleLevelSelection(3)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>Level 3</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        activeOpacity={0.5}
        style={{
          borderWidth: 2,
          borderColor: "#ff7f50",
          borderRadius: 15,
          height: 40,
          justifyContent: "center",
          margin:17
        }}   onPress={() => handleLevelSelection(4)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>Level 4</Text>
        </TouchableOpacity>
              
            </View>
  );
};

export default SelectLevelScreen;


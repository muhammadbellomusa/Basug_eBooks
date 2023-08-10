import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import * as Notifications from 'expo-notifications';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

    return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        selectedUserCourse: user ? user.course : null,
        login: async (email, password) => {
          try {
            auth()
              .signInWithEmailAndPassword(email, password)
              .catch((error) => Alert.alert("Login Error", error.message));
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, selectedCourse) => { // Add selectedCourse parameter
          try {
            const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
            auth()
              .createUserWithEmailAndPassword(email, password)
              .catch((error) => Alert.alert("Sign up error", error.message))
              .then(() => {
                // ... (existing code)

                // Save the selected course to Firestore
                firestore()
                  .collection("users")
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: "",
                    lname: "",
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                    course: selectedCourse, // Save the selected course here
                    expoPushToken: expoPushToken,
                   
                  })
                  
                  .catch((error) => {
                    console.log("Something went wrong with added user to firestore: ", error);
                  });
              })
              .catch((error) => {
                // ... (existing code)
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async (email, password) => {
          try {
            auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "./AuthProvider";
import auth from "@react-native-firebase/auth";
import { useContext } from "react";
import AppStack from "./AppStack";
import FeedStack from "./AppStack";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [darkApp, setDarkApp] = useState(false);
  const appTheme = darkApp ? DarkTheme : DefaultTheme;

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeThemeEvent",
      (data) => {
        setDarkApp(data);
      }
    );

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem("alreadyLaunched").then((value) => {
  //     if (value === false) {
  //       AsyncStorage.setItem("alreadyLaunched", "false");
  //       setDarkApp(false);
  //     } else {
  //       setDarkApp(true);
  //     }
  //   });
  // }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={appTheme}>
      {user ? <AppStack /> : <AuthStack />}
      
  
      
  
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UnboardingScreen from "../Screens/UnboardingScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";

const Stack = createStackNavigator();
const AuthStack = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLunch] = useState(null);

  const [darkApp, setDarkApp] = useState(false);
  // const appTheme = darkApp ? DarkTheme : DefaultTheme;

  // useEffect(() => {
  //   let eventListener = EventRegister.addEventListener(
  //     "changeThemeEvent",
  //     (data) => {
  //       setDarkApp(data);
  //     }
  //   );
  //   return () => {
  //     EventRegister.removeEventListener(eventListener);
  //   };
  // }, []);
  // const { colors } = useTheme();
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLunch(true);
      } else {
        setIsFirstLunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    // <NavigationContainer theme={appTheme}>
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

        // headerTitleStyle: { color: 'white' },
        // headerStyle: { backgroundColor: "#5e0acc" },
      }}>
      <Stack.Screen
        name="Onboarding"
        component={UnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          // headerTitleAlign: "center",
          headerTintColor: "#051d5f",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register",
          headerTintColor: "#051d5f",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerBackImage: () => (
            <FontAwesome name="long-arrow-left" size={28} color="#051d5f" />
          ),
        }}
      />
       <Stack.Screen
        name="ForgotScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: true, title:'' ,headerStyle:{backgroundColor:"#f9fafd"}}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});

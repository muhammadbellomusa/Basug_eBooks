import { StyleSheet, Text, View, Button, Image, Dimensions } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { StatusBar } from "expo-status-bar";

const UnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => navigation.replace("Login")}
      onSkip={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#1E90FF",
          image: <Image source={require("../assets/unboarding1.png")} />,
          title: "Welcome to BASUG eLearning",
          subtitle: "Learning Made Easy, Anytime, Anywhere",
        },
        {
          backgroundColor: "navy",
          image: (
            <Image
              source={require("../assets/unboarding2.png")}
              style={{ width: Dimensions.get("window").width, height: 200,borderRadius:3 }}
            />
          ),
          title: "Embark on an Academic Journey",
          subtitle: "Explore a World of Knowledge",
        },
        {
          backgroundColor: "orange",
          image: (
            <Image
              source={require("../assets/unboarding3.png")}
              style={{ resizeMode: "contain", height: 200 }}
            />
          ),
          title: "Enhance Your Skills with eLearning",
          subtitle: "Innovative Tools for Effective Learning",
        },
      ]}
    />
  );
};

export default UnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

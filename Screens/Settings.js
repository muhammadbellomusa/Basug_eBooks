import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Pressable,
} from "react-native";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLayoutEffect } from "react";
// import { TouchableRipple } from "react-native-paper";
import "react-native-gesture-handler";
import { fonts } from "@rneui/base";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useVoiceRecognitionScreen from "./useVoiceRecognitionScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const Settings = ({ navigation }) => {
  const { colors } = useTheme();
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerStyle: { backgroundColor: "#f9fafd" },
      headerRight: () => (
        <MenuProvider style={styles.container}>
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  top: 0,
                },
                triggerOuterWrapper: { padding: 0 },
              }}>
              <Ionicons name="ellipsis-vertical" size={29} color="black" />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: { height: 500 } }}>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
            </MenuOptions>
          </Menu>
        </MenuProvider>
      ),
    });
  }, []);

  return (
    <>
      <MenuProvider style={styles.container}>
        <Ionicons
          style={{ marginLeft: 8, color: colors.text }}
          name="arrow-back-outline"
          size={29}
          onPress={() => navigation.navigate("Profile")}
        />
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            color: colors.text,
          }}>
          Settings
        </Text>

        <Menu style={{ backgroundColor: colors.background }}>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                top: 0,
              },
              triggerOuterWrapper: { padding: 0 },
            }}>
            <View>
              <Ionicons
                name="ellipsis-vertical"
                size={29}
                style={{ color: colors.text }}
              />
            </View>
          </MenuTrigger>
          <MenuOptions
            style={{ backgroundColor: colors.background }}
            customStyles={{
              optionText: { fontSize: 17, color: colors.text, margin: 6 },
              optionsContainer: { shadowColor: "#grey", elevation: 8 },
            }}>
            <MenuOption
              onSelect={() => Alert.alert(`Activity`, "Your view list")}
              text="Activity"
            />
            <MenuOption
              onSelect={() =>
                Alert.alert(`Notifications`, "Manage your notifications")
              }
              text="Notifications"
            />
          </MenuOptions>
        </Menu>
      </MenuProvider>
      <>
        <View style={{ flex: 1, marginBottom: 550 }}>
          <View style={{flexDirection:"row"}}>
        {isListening ?           
          <FontAwesome5.Button
            name="microphone-slash"
            size={24}
            style={{}}
            color="navy" 
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={isListening ? stopListening : startListening}
          />
:
<FontAwesome5.Button
            name="microphone"
            size={24}
            style={{}}
            color="navy" 
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={isListening ? stopListening : startListening}
          />

        }
</View>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Search Engine</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Image</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Font Size</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Language</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Downloads</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
          <Pressable
            android_ripple={{ color: "#cccccc" }}
            onPress={() => navigation.navigate("InSettings")}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 11,
              padding: 10,
              margin: 8,
            }}>
            <Text style={{ color: colors.text }}>Notifications</Text>
            <FontAwesome name="angle-right" size={20} color="#cccccc" />
            {/* <Switch /> */}
          </Pressable>
        </View>
      </>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

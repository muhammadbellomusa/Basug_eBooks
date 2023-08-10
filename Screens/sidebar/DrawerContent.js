import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import { React, useState, useContext, createContext, useEffect } from "react";

import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import SwitchWithIcons from "react-native-switch-with-icons";
import { EventRegister } from "react-native-event-listeners";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "../../navigation/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import firestore from "@react-native-firebase/firestore";

import {
  Title,
  Avatar,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";


const DrawerContent = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);



  const getUser = async () => {
    await firestore()
      .collection("users")
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  // useEffect(() => {
  //   getUser();
  //   navigation.addListener("focus", () => setLoading(!loading));
  // }, [ loading]);



  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={[styles.userInfoSection, { flexDirection: "row" }]}>
            <View style={{ marginTop: 15, marginLeft: 15 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Avatar.Image
                  rounded
                  source={{
                    uri: userData
                      ? userData.userImg ||
                        "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png"
                      : "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png",
                      
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile")}
              activeOpacity={0.5}
            >
              <View style={{ marginLeft: 9, marginTop: 15 }}>
                <Title style={{ color: colors.text }}>
                  name
                </Title>
                <Caption style={{ color: colors.text }}>
                  <Text style={{ fontStyle: "italic", color: colors.text }}>
                    email
                  </Text>
                </Caption>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#cccccc",
              marginTop: 10,
            }}
          >
            <View style={styles.section}></View>
          </View>
          <Drawer.Section style={{ flex: 1, marginTop: 15 }}>
            <DrawerItem
              label="Home"
              onPress={() => {
                props.navigation.navigate("MyHome");
              }}
              style={{
                padding: 8,
              }}
            />

            <DrawerItem
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
              style={{
                padding: 8,
              }}
            />
            <DrawerItem
              label="PDF's"
              onPress={() => {
                props.navigation.navigate("PDf's");
              }}
              style={{
                padding: 8,
              }}
            />
            <DrawerItem
              label="About us"
              onPress={() => {
                props.navigation.navigate("About us");
              }}
              style={{
                padding: 8,
              }}
            />
            <DrawerItem
              label="Contact"
              onPress={() => {
                props.navigation.navigate("Contact");
              }}
              style={{ padding: 8 }}
            />
          </Drawer.Section>
          <View
            style={{
              color: colors.background,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                marginLeft: 20,
                color: colors.text,
                marginTop: 5,
              }}
            >
              preferences
            </Text>
            <TouchableRipple style={{ marginTop: 40 }}>
              <View style={styles.preference}>
                <Text style={{ color: colors.text }}>Dark Mode</Text>

                <SwitchWithIcons
                  onValueChange={(val) => {
                    setDarkMode(val);
                    EventRegister.emit("changeThemeEvent", val);
                  }}
                  value={darkMode}
                />
              </View>
            </TouchableRipple>
          </View>
        </View>
      </DrawerContentScrollView>
      <View>
        <Pressable onPress={()=>{}} android_ripple={{ color: "#cccccc" }}>
          <View style={styles.bottomDrawerSection}>
            <Text
              style={{
                marginTop: 15,
                marginLeft: 15,
                color: colors.text,
                padding: 2,
              }}
            >
              Sign Out
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
  },
  caption: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerContent: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#cccccc",
    borderTopWidth: 0.5,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
});

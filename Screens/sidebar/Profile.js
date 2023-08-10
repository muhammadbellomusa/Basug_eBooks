import { StyleSheet, View, SafeAreaView,TouchableOpacity, Linking } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "../../navigation/AuthProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import Share from "react-native-share";
import files from "../../assets/FilesBase64";
import useVoiceRecognitionScreen from "../useVoiceRecognitionScreen";
import { useLayoutEffect } from "react";


const Profile = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const { recognizedText, startListening } = useVoiceRecognitionScreen();
  const myCustomShare = async () => {
    const shareOptions = { message: "Download and install Basug eBooks app", };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log("error=>: ", error);
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          
          <TouchableOpacity style={{ justifyContent:"center",alignItems:"center",bottom:5,flexDirection:"row" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={28}
            color="navy"
            borderRadius={30}
            backgroundColor="orange"
            onPress={startListening}
          />
        </TouchableOpacity>

        <TouchableOpacity
              style={{ marginRight: 10 }}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Edit Profile")}>
              <MaterialCommunityIcons
                name="account-edit"
                size={30}
                style={{ color:'black' }}
              />
            </TouchableOpacity>


        </View>
      ),
    });
  }, [navigation]);



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

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
    console.log("user data", userData)
  }, [navigation, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: userData
                ? userData.userImg ||
                  "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png"
                : "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                { marginTop: 15, marginBottom: 5, color: colors.text },
              ]}>
              {userData ? userData.fname || "Test" : " Test"}{" "}
              {userData ? userData.lname || "User" : " User"}
            </Title>
            <Caption style={[styles.caption, { color: colors.text }]}>
              {userData ? userData.about || "No details added." : ""}
            </Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userData ? userData.city || "No details added." : ""}{" "}
            {userData ? userData.country || "No details added." : ""}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userData ? userData.phone || "No details added." : ""}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            { borderRightColor: "#dddddd", borderRightWidth: 1 },
          ]}>
          <Title style={{ color: colors.text }}>53</Title>
          <Caption style={{ color: colors.text }}>Books</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{ color: colors.text }}>12</Title>
          <Caption style={{ color: colors.text }}>PDF</Caption>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("StudentsProfile")}>
          <View style={styles.menuItem}>
            <Icon name="school-outline" color="navy" size={25} />
            <Text style={styles.menuItemText}>My school Profile</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="maroon" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="green" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate("Settings")}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color="purple" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => Linking.openURL("http://basuge-book.com.ng")}>
          <View style={styles.menuItem}>
            <Ionicons name="earth" color="brown" size={25} />
            <Text style={styles.menuItemText}>Basug eBooks web</Text>
          </View>
        </TouchableRipple>

      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import useVoiceRecognitionScreen from "../useVoiceRecognitionScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchWithIcons from "react-native-switch-with-icons";
import { useTheme } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import { auth, app } from "../Firebase";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../navigation/AuthProvider";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Share from "react-native-share";
import files from "../../assets/FilesBase64";


const CustomDrawer = ( props,{  navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const { colors } = useTheme();
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




  // useEffect(() => {
  //   AsyncStorage.getItem("alreadyLaunched").then((value) => {
  //     if (value == false) {
  //       AsyncStorage.setItem("alreadyLaunched", "true");
  //       setDarkMode(true);
  //     } else {
  //       setDarkMode(false);
  //     }
  //   });
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: "orange" }}
      >
        <ImageBackground
          source={{
            uri: userData
              ? userData.userImg ||
                "https://th.bing.com/th/id/OIP.2OEbemFUM8U8PkCk8UNBlgHaEK?pid=ImgDet&rs=1"
              : "https://th.bing.com/th/id/OIP.2OEbemFUM8U8PkCk8UNBlgHaEK?pid=ImgDet&rs=1",
          
              
          }}
          
          style={{ padding: 10, backgroundColor: "#ff7f50", marginTop: -48 }}>
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => props.navigation.navigate("Profile")}>
            <Text
              style={{
                // height: 100,
                // width: 100,
                borderRadius: 12,
                marginTop: 24,
                marginBottom: 10,
                fontSize: 50,
                backgroundColor: "orange",
                width: 70,
                marginLeft: 8,
                textAlign: "center",
              }}>
              {user.email[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity      onPress={startListening} style={{flexDirection:"row",justifyContent:"flex-end"}}><FontAwesome5
              name="microphone"
              size={28}
              color="navy"
              style={{ bottom: 50 }}

            /></TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="user"
              size={14}
              color="black"
              style={{ marginRight: 3 }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontStyle: "italic",
                marginBottom: 5,
              }}>
              {user.email[0]}
              {user.email[1]}
              {user.email[2]}
              {user.email[3]}
              
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#333",
                fontWeight: "bold",
                marginLeft: 3,
              }}></Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, paddingTop: 10 }}>
          <View style={{ marginLeft: 25 }}>
            {/* <DrawerItemList {...props} /> */}

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Home2")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="home-outline"
                  size={28}
                  style={{ color: 'brown' }}
                />
                <Text
                  style={{
                    fontSize: 15,

                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  Home
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="person-outline"
                  size={28}
                  style={{ color: 'brown' }}
                />
                <Text
                  style={{
                    fontSize: 15,

                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("PDf's")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="print-outline"
                  size={28}
                  style={{ color: "brown" }}
                />
                <Text
                  style={{
                    fontSize: 15,

                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  PDF's
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("StudentsProfile")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="school-outline"
                  size={28}
                  style={{ color: "brown" }}
                />
                <Text
                  style={{
                    fontSize: 15,

                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  My Records
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("About us")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="folder-outline"
                  size={25}
                  style={{ color: 'brown'  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  About Us
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Contact")}
              style={{ paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="mail-unread-outline"
                  size={28}
                  style={{ color: 'brown'  }}
                />
                <Text
                  style={{
                    fontSize: 15,

                    marginLeft: 15,
                    fontWeight: "bold",
                    color: colors.text,
                  }}>
                  Contact Us
                </Text>
              </View>
            </TouchableOpacity>

            <View
              onPress={() => {}}
              style={{ paddingVertical: 15, bottom:4 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <FontAwesome5
                  name="moon"
                  size={22}
                  style={{ color: 'maroon'  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 15,
                    fontWeight: "bold",
                    marginRight: 30,
                    color: colors.text,
                  }}>
                  Dark Mode
                </Text>
                <SwitchWithIcons
                  onValueChange={(val) => {
                    setDarkMode(val);
                    EventRegister.emit("changeThemeEvent", val);
                  }}
                  value={darkMode}
                />
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc",top:10 }}>
        <TouchableOpacity
          onPress={myCustomShare}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="share-social-outline"
              size={22}
              style={{ color: 'maroon'  }}
            />
            <Text
              style={{
                fontSize: 15,
                color: colors.text,
                marginLeft: 5,
                fontWeight: "bold",
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={0.7}
          onPress={() => logout()}
          style={{ paddingVertical: 15,width:100 }}>
          <View style={{ flexDirection: "row", alignItems: "center",
          backgroundColor:"maroon",padding:10,borderRadius:60,marginRight:170,width:100 }}>
            <Ionicons
              name="exit-outline"
              size={22}
              style={{ color:"white"}}
            />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
                color: 'white',
                fontWeight: "bold",
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

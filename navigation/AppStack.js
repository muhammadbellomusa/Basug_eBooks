import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useContext, useEffect, useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "..Screens/HomeScreen";
import HomeScreen from "../Screens/HomeScreen";
// import eLearning from "./ELearning";
import ELearning from "../Screens/Tabnavigation/ELearning";
// import HandOuts from "./HandOuts";
import HandOuts from "../Screens/Tabnavigation/HandOuts";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
// import ELearning from "./ELearning";

// import SearchScreen from "./SearchScreen";
import SearchScreen from "../Screens/Tabnavigation/SearchScreen";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomDrawer from "../Screens/sidebar/CustomDrawer";
import Profile from "../Screens/sidebar/Profile";
import PDfs from "../Screens/sidebar/PDfs";
import EditProfile from "../Screens/sidebar/EditProfile";
import ContactUs from "../Screens/sidebar/ContactUs";
import AboutUs from "../Screens/sidebar/AboutUs";
import Settings from "../Screens/Settings";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "./AuthProvider";
import StudentsProfile from "../Screens/sidebar/StudentsProfile";
import firestore from "@react-native-firebase/firestore";
import { Avatar } from "@rneui/themed";
import DrawerContent from "../Screens/sidebar/DrawerContent";

// import SelectLevelScreen from "../Screens/SchoolLevel/SelectLevelScreen";
import useVoiceRecognitionScreen from "../Screens/useVoiceRecognitionScreen";
import VoiceManualScreen from "../Screens/sidebar/VoiceManualScreen";
import Icon from "react-native-vector-icons/Ionicons";
import InSettings from "../Screens/sidebar/InSettings";


import DepartmentScreen from "../Screens/DepartmentScreen";
import CourseScreen from "../Screens/CourseScreen";
import SelectLevelScreen from "../Screens/SelectLevelScreen";
import LevelScreen from "../Screens/LevelScreen";
import ForumScreen from "../Screens/ForumScreen"
import ELearningScreen from "../Screens/ELearningScreen";

import { IconButton } from 'react-native-paper';









const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const TabNavigator = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { recognizedText, startListening } = useVoiceRecognitionScreen();


  const getTabBarStyle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    let display = routeName === "Profile" ? "none" : "flex";
    return { display };
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

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);




  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerTitleAlign: "center",

        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        headerStyle:{
          backgroundColor:'orange',
          
        },
        headerTintColor:'orange',
        tabBarInactiveBackgroundColor:'orange',
        tabBarActiveBackgroundColor:'brown',
        headerRight:()=>(
  <View> 
   <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"orange"}}
            color="navy"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />
        </TouchableOpacity>
  </View>          
        )
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            return       <IconButton icon={iconName} size={38} iconColor="#3B2042" />;
            
          },
          title: "Home",
          headerShown: true,
          tabBarStyle: getTabBarStyle(route),
          headerTintColor:'navy',

          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              activeOpacity={0.6}
              onPress={() => navigation.openDrawer()}>
              <FontAwesome name="bars" size={26} color='#541B54' />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Profile")}>
              {/* <FontAwesome name="bars" size={26} color='maroon' /> */}
              <Avatar rounded source={{uri: userData
                ? userData.userImg ||
                  "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png"
                : "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png",
              
            }} />

            
            </TouchableOpacity>
          ),
        })}
      />

      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            iconName = focused ? "search" : "search-outline";
            return <Ionicons name={iconName} size={size} color="#3B2042" />;
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="HandOuts"
        component={HandOuts}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            iconName = focused ? "school" : "school-outline";

            return <Ionicons name={iconName} size={size} color="#3B2042" />;
          },
       
          headerShown:true,
          title:"School Activities",
          headerTintColor:"#541B54",
          
        }}
      />

      <Tab.Screen
        name="eLearnng"
        component={ELearning}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: 'maroon' },

          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            iconName = focused ? "videocam" : "videocam-outline";
            return <Ionicons name={iconName} size={size} color="#3B2042" />;
          },
          headerRight: () => (
            <Ionicons
              name="earth-outline"
              size={30}
              color="black"
              style={{ marginRight: 10 }}
            />
          ),
          headerTintColor:"#541B54"
        }}
      />
    </Tab.Navigator>
  );
};

// const ProfileStack = ({ navigation }) => {
//   return (
//     <Stack.Navigator>
//       </Stack.Navigator>
//   );
// };

const HomeStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { recognizedText, startListening } = useVoiceRecognitionScreen();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle:{
          backgroundColor:'orange'
        },
        headerTintColor:'#541B54',
        headerTitleAlign:"center",
        headerRight:()=>(
          <View><TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"orange"}}
            color="navy"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />
        </TouchableOpacity>
</View>
        )
      }}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
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
          ),
        }}
      />
            <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                name="arrow-back"
                size={28}
                style={{ color: colors.text }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="InSettings"
        component={InSettings}
        options={{ headerTitleAlign: "center", title: "Advanced Settings" }}
      />
      {/* <Stack.Screen name="SelectLevel" component={SelectLevelScreen} /> */}
      <Stack.Screen name="VoiceManual" component={VoiceManualScreen} />

      <Stack.Screen name="Department" component={DepartmentScreen} options={{ title: 'Departments' }} />
        <Stack.Screen name="Course" component={CourseScreen} options={{ title: 'Courses' }} />
        <Stack.Screen name="SelectLevel" component={SelectLevelScreen}  options={({ route }) => ({
          title: `${route.params.selectedCourse} `
        })} />
        <Stack.Screen name="Level" component={LevelScreen} options={{ title: 'Level' }} />
        <Stack.Screen  name="DiscussionForumScreen" component={ForumScreen}         options={({ route }) => ({
          title: `${route.params.selectedCourse} L${route.params.selectedLevel} Forum`, headerStyle:{backgroundColor:"#007BFF"},headerTintColor:"white"
        })}
 />

<Stack.Screen  name="ELearningScreen" component={ELearningScreen}         options={({ route }) => ({
          title: "ELearning", headerStyle:{backgroundColor:"#007BFF"},headerTintColor:"white"
        })}
 />
 <Stack.Screen name="StudentsProfile" component={StudentsProfile} options={{ title: 'My Records (safsrms)' }} />
 

    </Stack.Navigator>
  );
};

const AppStack = ({ props }) => {
  const { colors } = useTheme();
  const { recognizedText, startListening } = useVoiceRecognitionScreen();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={28}
              style={{ color: "#541B54" }}
            />
          </TouchableOpacity>
        ),
        headerRight:()=>(
          <View><TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"orange"}}
            color="navy"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />
        </TouchableOpacity>
</View>
        ),
        swipeEdgeWidth: 300,

        drawerStyle: { width: "88%" },
        headerStyle:{backgroundColor:"orange"},
        headerTintColor:"#541B54"
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        // options={({ route }) => {
        //   const routeName = getFocusedRouteNameFromRoute(route);
        //   return {
        //     swipeEnabled: routeName == "TabNavigator",
        //     headerShown: false,
        //   };
        // }}
        options={{ headerShown: false }}
        component={HomeStack}
      />

      <Drawer.Screen
        name="PDf's"
        component={PDfs}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutUs}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactUs}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});

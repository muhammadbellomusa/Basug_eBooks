import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import eLearning from "./ELearning";
import HandOuts from "./HandOuts";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import ELearning from "./ELearning";
import SearchScreen from "./SearchScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  // const ref = React.useRef < useNavigationContainerRef > null;
  // const [notificatioBadgeVisible, setNotificationBadgeVisible] =
  //   React.useState(true);
  const { colors } = useTheme();
  const onOpenDrawer = () => {
    navigation.openDrawer();
  };

  // const navigationStateChangeHandler = () => {
  //   if (ref.current?.getCurrentRoute()?.name === "eLearning") {
  //     setNotificationBadgeVisible(false);
  //   }
  // };
  // React.useEffect(() => {
  //   ref.current?.addListener("state", navigationStateChangeHandler);
  //   return () => {
  //     ref.current?.removeListener("state", navigationStateChangeHandler);
  //   };
  // });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerTitleAlign: "center",

        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          title: "Home",

          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              activeOpacity={0.6}
              onPress={onOpenDrawer}>
              <FontAwesome name="bars" size={26} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            iconName = focused ? "search" : "search-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
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
            
            iconName = focused ? "create" : "create-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerRight: () => (
            <FontAwesome
              name="book"
              size={30}
              color={colors.text}
              onPress={() => {}}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="eLearnng"
        component={ELearning}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: colors.text },

          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            iconName = focused ? "videocam" : "videocam-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerRight: () => (
            <Ionicons
              name="earth-outline"
              size={30}
              color={colors.text}
              onPress={() => navigation.goBack()}
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

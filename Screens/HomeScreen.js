// HomeScreen.js
import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
  Button,
  Dimensions,
  Alert,
  Animated
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { AuthContext } from "../navigation/AuthProvider";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useVoiceRecognitionScreen from "./useVoiceRecognitionScreen";
import { StatusBar } from "expo-status-bar";
import * as Speech from 'expo-speech';
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";





const faculties = [
  'Faculty of Science',
  'Faculty of Arts',
  'Faculty of Education',
  'Faculty of Social and Management Science',
  'Faculty of Basic Medical Science',
  'Faculty of Law',
  'Faculty of Agriculture',
  'Faculty of Pharmaceutical Science',
  
];


const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ['Faculties', 'Embrace Learning Challenge',
   'Discover New Courses','BASUG - A Journey of Learning',
   'Academic Excellence','Transforming Dreams to Reality','Unleash Your Potential']; // Add more texts as needed
  const animationDuration = 4000; // 4 seconds

  const textOpacity = new Animated.Value(1);

  useEffect(() => {
    const nextTextIndex = (currentTextIndex + 1) % texts.length;

    const fadeInAnimation = Animated.timing(textOpacity, {
      toValue: 1,
      duration: animationDuration / 1,
      useNativeDriver: true,
    });

    const fadeOutAnimation = Animated.timing(textOpacity, {
      toValue: 0,
      duration: animationDuration / 0.5,
      useNativeDriver: true,
    });

    // Sequence the fade-in and fade-out animations
    Animated.sequence([fadeOutAnimation, fadeInAnimation]).start(() => {
      setCurrentTextIndex(nextTextIndex);
    });
  }, [currentTextIndex]);





  const handleFacultySelection = (selectedFaculty) => {
    const spokenFaculty = recognizedText.trim();
    
    navigation.navigate('Department', { selectedFaculty });
  };

  useEffect(()=>{

},[])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { colors } = useTheme();
  const { user, logout } = useContext(AuthContext);






  return (

    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 345 }}>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
                 
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



        


        </TouchableOpacity>
        {/* <Text >Faculties</Text> */}
        <Animated.Text 
        style={{ color: "maroon", fontSize: 23, textAlign: "center", fontWeight: "bold", opacity: textOpacity }}>
          {texts[currentTextIndex]}
          </Animated.Text>
      
        <View style={{ display: "flex", marginTop: 4 }}>
          <Avatar size={35} rounded source={require("../assets/Icons.png")} />
        </View>
      </View>
      
        <View>
          <StatusBar style="auto" />
          
        </View>
      <View style={{width:Dimensions.get("window").width, flexDirection:"row"}}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {faculties.map((faculty, index) => (
        <View key={index} style={{marginBottom: -60, width: '50%',
        padding: 10,}}>
        <TouchableOpacity activeOpacity={0.6} style={styles.button} key={faculty}  onPress={() => handleFacultySelection(faculty)} >
          <Text key={faculty} style={styles.text}>{faculty}</Text>
        </TouchableOpacity>
        </View>
        
      ))}
      
      </View>
     
      </ScrollView>
      
      </View>
        
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
  buttons: {
    margin: 23,
    marginBottom: 20,
    
  },
  button: {
    borderWidth: 1,
    borderColor: "#ff7f50",
    padding: 20,
    backgroundColor: "#ff7f50",
    borderRadius: 20,
    marginBottom: 90,
    bottom:10,
    height: Dimensions.get("window").height / 3.8,
    width: Dimensions.get("window").width / 2.4,
    justifyContent: "center",
    margin: 10,
    shadowColor: "black",
    elevation: 15,
    
  },
  text: {
    color: "#762207",
    textAlign: "center",
    fontWeight: "bold",
  },
});

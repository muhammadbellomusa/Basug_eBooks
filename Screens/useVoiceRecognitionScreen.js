// useVoiceRecognitionScreen.js
import { useEffect, useRef, useState } from "react";
import * as Speech from 'expo-speech';
import { useNavigation } from "@react-navigation/native";
import Voice from '@react-native-voice/voice';

const useVoiceRecognitionScreen = (selectedFaculty) => {
  const [recognizedText, setRecognizedText] = useState("");
  const navigation = useNavigation();
  const voiceRecognizerRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isIconSlashed, setIsIconSlashed] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      const recognizedText = e.value[0].toLowerCase().trim();
      setRecognizedText(recognizedText);
      handleVoiceCommands(recognizedText);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // useEffect(() => {
  //   // Initialize voice recognition when the component mounts
  //   startListening();

  //   return () => {
  //     // Clean up voice recognition when the component unmounts
  //     stopListening();
  //   };
  // }, []);

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false)
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
 

  const handleVoiceCommands = (recognizedText) => {
     if (recognizedText.match(/go back/)) {
        navigation.goBack();
        Speech.speak("Navigating back");
      }else if (recognizedText.match(/go home/)) {
        navigation.navigate("Home2");
        Speech.speak("Navigating back to home");
      }else if (recognizedText.match(/open/)) {
        navigation.openDrawer();
        Speech.speak("Drawer opened");
      }else if (recognizedText.match(/close/)) {
        navigation.closeDrawer();
        Speech.speak("Drawer closed");
      }else if (recognizedText.match(/profile/)) {
        navigation.navigate("Profile");
        Speech.speak("Navigating to Profile");
      }else if (recognizedText.match(/edit/) || recognizedText.match(/edit profile/)) {
        navigation.navigate("Edit Profile");
        Speech.speak("Navigating to Edit Profile Screen");
      }else if (recognizedText.match(/books/) || recognizedText.match(/learning/)) {
        navigation.navigate("eLearnng");
        Speech.speak("Navigating to e Learning Screen");
      }else if (recognizedText.match(/search/)) {
        navigation.navigate("search");
        Speech.speak("Navigating to Search Screen");
      }else if (recognizedText.match(/portal/)) {
        navigation.navigate("HandOuts");
        Speech.speak("Navigating to School Portal Screen");
      }else if (recognizedText.match(/settings/)) {
        navigation.navigate("Settings");
        Speech.speak("Navigating to Settings Screen");
      }else if (recognizedText.match(/my/)) {
        navigation.navigate("StudentsProfile");
        Speech.speak("Navigating to SRMS Portal Screen");
      }else if (recognizedText.match(/manual/)) {
        navigation.navigate("VoiceManual");
        Speech.speak("Navigating to Manual Screen");
      }else if (recognizedText.match(/about/)) {
        navigation.navigate("About us");
        Speech.speak("Navigating to About us Screen");
      }



      else if (recognizedText.match(/faculty of science/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Science" });
        Speech.speak("Navigating to the Faculty of Science");
      } else if (recognizedText.match(/faculty of arts/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Arts" });
        Speech.speak("Navigating to the Faculty of Arts");
      }else if (recognizedText.match(/faculty of education/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Education" });
        Speech.speak("Navigating to the Faculty of Education");
      } else if (recognizedText.match(/basic/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Basic Medical Science" });
        Speech.speak("Navigating to the Faculty of Medicine");
      } else if (recognizedText.match(/management/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Social and Management Science" });
        Speech.speak("Navigating to the Faculty of Social and Management sciences");
      } else if (recognizedText.match(/faculty of agric/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Agriculture" });
        Speech.speak("Navigating to the Faculty of Agricultural science");
      } else if (recognizedText.match(/pharmacy/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Pharmaceutical Science" });
        Speech.speak("Navigating to the Faculty of Pharmaceutical Science");
      } else if (recognizedText.match(/law/)) {
        navigation.navigate("Department", { selectedFaculty: "Faculty of Law" });
        Speech.speak("Navigating to the Faculty of Law");
      }else if (recognizedText.match(/mathematical/) || recognizedText.match(/maths/)) {
        navigation.navigate("Course", { selectedDepartment : "Mathematical Science Department" });
        Speech.speak("Welcome to Mathematical Science department");
      }else if (recognizedText.match(/bio/)) {
        navigation.navigate("Course", { selectedDepartment : "Biological Science Department" });
        Speech.speak("welcome to Biological Science department");
      }else if (recognizedText.match(/chemistry/)) {
        navigation.navigate("Course", { selectedDepartment : "Chemistry Department" });
        Speech.speak("Navigating to Chemistry department");
      }else if (recognizedText.match(/physics/)) {
        navigation.navigate("Course", { selectedDepartment : "Physics Department" });
        Speech.speak("welcome to physics department");
      }else if (recognizedText.match(/english/)) {
        navigation.navigate("Course", { selectedDepartment : "English Department" });
        Speech.speak("welcome to English department");
      }else if (recognizedText.match(/islamic/)) {
        navigation.navigate("Course", { selectedDepartment : "Islamic Department" });
        Speech.speak("Navigating to islamic department");
      }else if (recognizedText.match(/hausa/)) {
        navigation.navigate("Course", { selectedDepartment : "Hausa Department" });
        Speech.speak("Navigating to Hausa department");
      }else if (recognizedText.match(/arabic/)) {
        navigation.navigate("Course", { selectedDepartment : "Arabic Department" });
        Speech.speak("welcome to arabic department");
      }else if (recognizedText.match(/library/)) {
        navigation.navigate("Course", { selectedDepartment : "Library and Information Science Department" });
        Speech.speak("welcome to Library and information science department");
      }else if (recognizedText.match(/computer education/)) {
        navigation.navigate("Course", { selectedDepartment : "Computer Education Department" });
        Speech.speak("Navigating to computer education department");
      }else if (recognizedText.match(/physics education/)) {
        navigation.navigate("Course", { selectedDepartment : "Physics Education Department" });
        Speech.speak("Navigating to physics education department");
      }else if (recognizedText.match(/maths education/)) {
        navigation.navigate("Course", { selectedDepartment : "Mathematics Education Department" });
        Speech.speak("Navigating to mathematics education department");
      }else if (recognizedText.match(/chemistry education/)) {
        navigation.navigate("Course", { selectedDepartment : "Chemistry Education Department" });
        Speech.speak("Navigating to chemistry education department");
      }
      else if (recognizedText.match(/anatomy/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Anatomy" });
        Speech.speak("Navigating to anatomy department");
      }else if (recognizedText.match(/physiology/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Physiology" });
        Speech.speak("welcome to physiology department");
      }else if (recognizedText.match(/pharmacology/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Pharmacology" });
        Speech.speak("welcome to pharmacology department");
      }else if (recognizedText.match(/public health/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Public Health" });
        Speech.speak("welcome to public health department");
      }else if (recognizedText.match(/economics/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Economics" });
        Speech.speak("welcome to economics department");
      }else if (recognizedText.match(/political/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Political Science" });
        Speech.speak("Navigating to political science department");
      }else if (recognizedText.match(/sociology/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Sociology" });
        Speech.speak("welcome to Sociology department");
      }else if (recognizedText.match(/public/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Public Administration" });
        Speech.speak("Navigating to public administration department");
      }else if (recognizedText.match(/business/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Business Administration" });
        Speech.speak("Navigating to Business administration department");
      }else if (recognizedText.match(/department of agric/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Agricultural Science" });
        Speech.speak("Navigating to Agricultural science department");
      }else if (recognizedText.match(/pharmaceutical/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Pharmacy" });
        Speech.speak("Navigating to pharmaceutical science department");
      }else if (recognizedText.match(/department of law/)) {
        navigation.navigate("Course", { selectedDepartment : "Department of Criminal Law" });
        Speech.speak("Navigating to department of law");
      }
      
      else if (recognizedText.match(/computer science/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Computer Science" });
        Speech.speak("Welcome to Computer Science department, you can select your level");
      }
      else if (recognizedText.match(/mathematics/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Mathematics" });
        Speech.speak("Welcome to Mathematics, you can select your level");
      }else if (recognizedText.match(/statistics/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Statistics" });
        Speech.speak("Welcome to statistics, you can select your level");
      }else if (recognizedText.match(/botany/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Botany" });
        Speech.speak("Welcome to Botany, you can select your level");
      }else if (recognizedText.match(/Zoology/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Zoology" });
        Speech.speak("Welcome to Zoology, you can select your level");
      }else if (recognizedText.match(/micro/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Micro-Biology" });
        Speech.speak("Welcome to micro biology, you can select your level");
      }else if (recognizedText.match(/biochemistry/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Biochemistry" });
        Speech.speak("Welcome to bio chemistry, you can select your level");
      }else if (recognizedText.match(/technology/)) {
        navigation.navigate("SelectLevel", { selectedCourse : "Science Laboratory Technology" });
        Speech.speak("Welcome to Science Laboratory technology, you can select your level");
      }
     else {
      Speech.speak("Unrecognized command, please speak correctly or check the voice mannual");
    }
  };

  return {
    recognizedText,
    startListening,
    stopListening,
  isListening,
  isIconSlashed,
  setIsIconSlashed

  };
};

export default useVoiceRecognitionScreen;

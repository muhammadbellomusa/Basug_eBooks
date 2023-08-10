// DepartmentScreen.js
import React from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import useVoiceRecognitionScreen from "./useVoiceRecognitionScreen";
import { useTheme } from "@react-navigation/native";
const getRandomDepartments = (selectedFaculty) => {
    // Replace with arrays of departments corresponding to each faculty
    // This is just a sample, please replace with your own data
    const departments = {
      'Faculty of Science': ['Mathematical Science Department', 'Chemistry Department', 'Physics Department',
       'Biological Science Department','Biochemistry Department', 'Science Laboratory Technology Department', ],
      'Faculty of Arts': ['English Department', 'Arabic Department', 'Islamic Department', 'Hausa Department', 'Library and Information Science Department'],
      'Faculty of Education':['Computer Education Department','Mathematics Education Department','Chemistry Education Department',
      'Physics Education Department',
      'English Education Department','Biology Education Department',
    ],
      'Faculty of Basic Medical Science': ['Department of Anatomy', 'Department of Physiology', 'Department of Pharmacology', 
      'Department of Public Health',],
      'Faculty of Social and Management Science': ['Department of Economics', 'Department of Political Science', 
      'Department of Sociology', 'Department of Public Administration','Department of Business Administration'],
      'Faculty of Agriculture': ['Department of Agricultural Science', 'Department of Animal Science',
       'Department of Crop Science', 'Department of Agricultural Economics'],
      'Faculty of Law': ['Department of Constitutional Law', 'Department of Criminal Law', 'Department of Shariah Law'],
      'Faculty of Pharmaceutical Science': ['Department of Pharmacy'],
    };
  
    return departments[selectedFaculty] || [];
  };
  


const DepartmentScreen = ({ navigation, route }) => {
  const { selectedFaculty } = route.params;
  const departments = getRandomDepartments(selectedFaculty);
  const { recognizedText, startListening, stopListening, isListening, } = useVoiceRecognitionScreen();
  
  const { colors } = useTheme();


  const handleDepartmentSelection = (selectedDepartment) => {
    navigation.navigate('Course', { selectedDepartment });
  };

  return (
    <View style={{marginTop:20}}>
      {departments.map((department) => (
        <TouchableOpacity 
        activeOpacity={0.5}
        style={{
          borderWidth: 2,
          borderColor: "#ff7f50",
          borderRadius: 15,
          height: 40,
          justifyContent: "center",
          margin:17
        }} 
          
          key={department} onPress={() => handleDepartmentSelection(department)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>{department}</Text>
          </TouchableOpacity>

      ))}
    </View>
  );
};

export default DepartmentScreen;


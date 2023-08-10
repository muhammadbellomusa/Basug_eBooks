// CourseScreen.js
import React from 'react';
import { View, Button, Text,TouchableOpacity } from 'react-native';
import { useTheme } from "@react-navigation/native";


const getRandomCourses = (department) => {
    // Replace with arrays of courses corresponding to each department
    // This is just a sample, please replace with your own data
    const courses = {
        'Mathematical Science Department': ['Computer Science', 'Mathematics', 'Statistics'],
        'Chemistry Department': ['Chemistry'],
        'Physics Department': ['Physics'],
        'Biological Science Department': ['Botany', 'Zoology', 'Micro-Biology'],
        'Biochemistry Department': ['Biochemistry'],
        'Science Laboratory Technology Department': ['Science Laboratory Technology'],
        'English Department': ['English'],
        'Arabic Department': ['Arabic'],
        'Islamic Department': ['Islamic'],
        'Hausa Department': ['Hausa'],
        'Library and Information Science Department': ['Library and Information Science'],
        'Computer Education Department': ['Computer Education '],
        'Mathematics Education Department': ['Mathematics Education'],
        'Chemistry Education Department': ['Chemistry Education'],
        'Physics Education Department': ['Physics Education'],
        'English Education Department': ['English Education'],
        'Biology Education Department': ['Biology Education'],
        'Department of Economics': ['Economics'],
        'Department of Political Science': ['Political Science'],
        'Department of Sociology': ['Sociology'],
        'Department of Public Administration': ['Public Administration'],
        'Department of Business Administration': ['Business Administration'],
        'Department of Anatomy': ['Anatomy'],
        'Department of Physiology': ['Physiology'],
        'Department of Pharmacology': ['Pharmacology'],
        'Department of Public Health': ['Public Health'],
        'Department of Constitutional Law': ['Constitutional Law'],
        'Department of Criminal Law': ['Criminal Law'],
        'Department of Shariah Law': ['Shariah Law'],
        'Department of Agricultural Science': ['Agricultural Science'],
        'Department of Animal Science': ['Animal Science'],
        'Department of Crop Science': ['Crop Science'],
        'Department of Agricultural Economics': ['Agricultural Economics'],
        'Department of Pharmacy': ['Pharmacy'],


      };
    
  
    return courses[department];
  };
  


const CourseScreen = ({ navigation, route }) => {
  const { selectedDepartment } = route.params;
  const courses = getRandomCourses(selectedDepartment);
const {colors} = useTheme();
  const handleCourseSelection = (selectedCourse) => {
    navigation.navigate('SelectLevel', { selectedCourse });
  };

  return (
    <View style={{marginTop:20}}>
      {courses.map((course) => (
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
         
        key={course} onPress={() => handleCourseSelection(course)}>
          <Text style={{ color:colors.text, textAlign: "center" }}>{course}</Text>
        </TouchableOpacity>
   
      ))}
    </View>
  );
};

export default CourseScreen;

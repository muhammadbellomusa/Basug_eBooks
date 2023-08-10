import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useRef } from "react";
import { Text, Input, Button } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import { auth } from "./Firebase";
import ModalSelector from 'react-native-modal-selector';


// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";

import { AuthContext } from "../navigation/AuthProvider";
import { useContext } from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { register } = useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const modalSelectorRef = useRef(null);


  const courseData = [
    { key: 1, label: 'Computer Science' },
    { key: 2, label: 'Mathematics' },
    { key: 3, label: 'Statistics' },
    { key: 4, label: 'Chemistry' },
    { key: 5, label: 'Physics' },
    { key: 6, label: 'Botany' },
    { key: 7, label: 'Zoology' },
    { key: 8, label: 'Micro-Biology' },
    { key: 9, label: 'Biochemistry' },
    { key: 10, label: 'Science Laboratory Technology' },
    { key: 11, label: 'English' },
    { key: 12, label: 'Arabic' },
    { key: 13, label: 'Islamic' },
    { key: 14, label: 'Hausa' },
    { key: 15, label: 'Library and Information Science' },
    { key: 16, label: 'Economics' },
    { key: 17, label: 'Political Science' },
    { key: 18, label: 'Public Administration' },
    { key: 19, label: 'Sociology' },
    { key: 20, label: 'Business Administration' },
    { key: 21, label: 'Anatomy' },
    { key: 22, label: 'Physiology' },
    { key: 23, label: 'Pharmacology' },
    { key: 24, label: 'Public Health' },
    { key: 25, label: 'Constitutional Law' },
    { key: 26, label: 'Criminal Law' },
    { key: 27, label: 'Shariah Law' },
    { key: 28, label: 'Agricultural Science' },
    { key: 29, label: 'Animal Science' },
    { key: 30, label: 'Crop Science' },
    { key: 31, label: 'Pharmacy' },
    { key: 32, label: 'Mathematics Education' },
    { key: 33, label: 'Chemistry Education' },
    { key: 34, label: 'Physics Education' },
    { key: 35, label: 'Computer Education' },
    { key: 36, label: 'Biology Education' },
    { key: 37, label: 'English Education' },
    // Add more course options as needed
  ];
  
  const { ref } = Yup;


  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email address."),
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Please enter your password"),
      // .matches(/[0-9]/, getCharacterValidationError("digit")),
      // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: Yup.string()
      .min(8, "Confirm Password must be 8 characters long.")
      .oneOf([Yup.ref("password")], "Your Passwords do not match.")
      .required("Confirm password is required."),
      
      // selectedCourse: Yup.object().nullable().required("Please select a course"),
      
  });

  return (
    <Formik
    initialValues={{ email: "", password: "", confirmPassword: "" }}

    validationSchema={SignupSchema}
    onSubmit={(values) => {
      
        // Pass the selected course along with the email and password during registration
       register(values.email, values.password, selectedCourse);
    
        // Once the user is registered and the selected course is saved to Firestore,
        // you can perform any additional actions here, if needed.
      
    }}
    
  >
    {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Image source={require("../assets/Icons.png")} style={{width:40,height:50,borderRadius:25}} />

        <Text style={styles.text}>Create an Account</Text>
        <FormInput
          labelValue={values.email}
          onChangeText={handleChange("email")}
          onBlur={() => setFieldTouched("email")}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <FormInput
          labelValue={values.password}
          onChangeText={handleChange("password")}
          onBlur={() => setFieldTouched("password")}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <FormInput
          labelValue={values.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          onBlur={() => setFieldTouched("confirmPassword")}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        {/* ModalSelector for selecting the course */}

        <TouchableOpacity onPress={() => modalSelectorRef.open()}>
          <Text style={styles.selectCourseText}>
            {selectedCourse ? `Selected Course: ${selectedCourse}` : null}
          </Text>
        </TouchableOpacity>

        {/* ModalSelector component */}
        
        <ModalSelector initValueTextStyle={{ color: "#051d5f", fontSize: 18 }} 
        optionTextStyle={{ color: "#051d5f", fontSize: 16 }} 
        style={styles.modalSelector}
          data={courseData}
          initValue="Select your Course of study"
          onChange={(option) => setSelectedCourse(option.label)}
          
          ref={(ref) => (modalSelectorRef = ref)}  // Store a reference to the ModalSelector component
        />
              {/* {touched.selectedCourse && errors.selectedCourse && (
           <Text style={styles.errorText}>{errors.selectedCourse}</Text>
          )} */}
        {/* Rest of the registration form */}
        {/* ... */}

        {/* Your form submission button */}
        <View style={{
    padding: 10,
    width: Dimensions.get("window").width / 1,
  }}>
        <Button
  title="Sign Up"
  onPress={handleSubmit}
  color="#d2691e" 
  disabled={!isValid || !selectedCourse}
/>

      </View>
{/* <FormButton
            buttonTitle="Sign Up"
            onPress={handleSubmit}
            style={{
              backgroundColor: isValid && selectedCourse? "#d2691e" : "#ffdead",
              width: "100%",
              marginTop: 10,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              height: windowHeight / 15,
            }}
          /> */}

<View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By registering, you confirm that you accept our
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                Terms of service
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.color_textPrivate}> and </Text>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Privacy Policy
            </Text>
          </View>

          <View style={styles.navButton}>
            <Text style={{ fontSize: 18, color: "#051d5f" }}>
              Already Have an Account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.navButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
      

        {/* Rest of the content */}
        {/* ... */}
      </KeyboardAvoidingView>
    )}
  </Formik>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    // fontFamily: "kufam-semiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
    flexDirection: "row",
  },

  navButtonText: {
    fontSize: 18,
      color: "#2e64e5",
  
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    // fontFamily: "Loto-Regular",
    color: "gray",
  },
  errorText: {
    color: "red",
  },
  selectCourseText:{
    fontSize:20,

  },
  modalSelector:{
    padding:10,
    width:Dimensions.get("window").width,
    

  }
});

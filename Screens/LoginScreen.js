import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import { Input, Image, Button, SearchBar } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { auth } from "./Firebase";
// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";
import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { windowHeight, windowWidth } from "../utils/Dimentions";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email address."),
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Please enter your password")
    //   .matches(/[0-9]/, getCharacterValidationError("digit"))
    // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  });

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       navigation.replace("Home");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={SigninSchema}
      onSubmit={(values) => {
        login(values.email, values.password);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <Image source={require("../assets/Icons.png")} style={styles.logo} />
          <Text style={styles.text}>Basug eLearning</Text>
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
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
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
          <FormButton
            buttonTitle="Sign In"
            onPress={handleSubmit}
            style={{
              backgroundColor: isValid ? "#d2691e" : "#ffdead",
              width: "100%",
              marginTop: 10,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              height: windowHeight / 15,
            }}
          />
          <View style={styles.forgotButton}>
            <Text
              style={{ fontSize: 18, color: "#051d5f", fontStyle: "italic" }}>
              Don't Have an Account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.navButtonText}> Create here</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ForgotScreen")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius:40
  },
  text: {
    // fontFamily: "kufam-semiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
    fontStyle: "italic",
  },
  navButton: {
    marginTop: 15,
    marginRight: 150,
  },
  forgotButton: {
    marginVertical: 35,
    flexDirection: "row",
  },
  navButtonText: {
    fontSize: 18,
    color: "#2e64e5",
    fontStyle: "italic",
  },
  forgotText: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#2e64e5",
    
  },
  errorText: {
    color: "red",
  },
});

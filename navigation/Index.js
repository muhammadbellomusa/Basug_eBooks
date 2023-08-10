import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Routes from "./Routes";
import AuthProvider from "./AuthProvider";


const Index = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Index;

const styles = StyleSheet.create({});

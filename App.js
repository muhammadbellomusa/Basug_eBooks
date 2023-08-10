import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Index from "./navigation/Index";
import registerNNPushToken from "native-notify";

const App = () => {
  registerNNPushToken(8209, 'cmk42oD4FmMXgOmxJPef4j');
  return <Index />;
};

export default App;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, Linking, Alert, FlatList} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Link, useTheme } from "@react-navigation/native";
import { Button, Input, Icon } from "@rneui/base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { app } from "../Firebase";
// import {
//   doc,
//   addDoc,
//   getFirestore,
//   collection,
//   DocumentReference,
// } from "firebase/firestore";
// import { db } from "../Firebase";
// import { async } from "@firebase/util";
import firestore from "@react-native-firebase/firestore";
import { measure } from "react-native-reanimated";

const ContactUs = ({ navigation }) => {
  const number = "+234 7019869429";
  const message = "Hello Yaya";
  const openUrl = async () => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this url: ${url}`);
    }
  };

  const { colors } = useTheme();
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Contact",
      headerBackTitle: "back",
    });
  }, [navigation]);

  const sendMessage = async () => {
    firestore()
      .collection("messages")
      .add({
        message: input,
      })
      .then(() => {
        Alert.alert(
          "Post Published",
          "Your Post has been Published Successfully"
        );
        setInput(null);
      })
      .catch((error) => {
        console.log("Something went wrong with added post to firestore ");
      });
  };



  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 21, color: colors.text }}>
        Contact us Via
      </Text>

      <View style={{ marginTop: 20, marginBottom: 2 }}>
        <Button
          title="Gmail"
          color="#d2691e"
          onPress={() =>
            Linking.openURL(
              `mailto:muhammadbellomusa17@gmail.com?subject=testing&body=${message}`
            )
          }
        />
      </View>
      <View style={{ marginTop: 20, marginBottom: 2 }}>
        <Button
          type="outline"
          raised
          title="facebook"
          onPress={() =>
            Linking.openURL(`https://web.facebook.com/yaya.musa.940`)
          }
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="WhatsApp"
          color="#075E54"
          onPress={() =>
            Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`)
          }
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 75,
        }}>
        <Input
          placeholder="We like to hear from you"
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={sendMessage}
          leftIcon={<Ionicons name="mail-outline" size={24} color="grey" />}
          style={{ color: "grey" }}
        />
        <Button
          disabled={!input}
          onPress={sendMessage}
          title="Contact us"
          color="purple"
        />
      </View>

    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

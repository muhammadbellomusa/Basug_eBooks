import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AboutUs = ({navigation}) => {
  const { colors } = useTheme();
  return (
    <View>
       <View style={{flexDirection:"row",justifyContent:"center",top:15,marginBottom:15}}>
        <TouchableOpacity onPress={()=>navigation.navigate("VoiceManual")} activeOpacity={0.5} style={{flexDirection:"row",justifyContent:"center",alignItems:"center" ,backgroundColor:"navy",padding:5,width:220,borderRadius:25}}>
          <Text style={{color:"white"}}>Check Voice Recognition Maual</Text>
            <FontAwesome5.Button name="microphone" size={18} color="white" backgroundColor="navy"   />
          </TouchableOpacity>

          </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       
        <Text
          style={{
            color: colors.text,
            marginTop: 20,
            marginLeft: 10,
            fontSize: 15,
            fontStyle: "italic",
          }}>
          The App is is purposely for students who are determined to read their
          respective hand-outs for their various courses,and relevant news regarding their academic activities.
        </Text>
        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontStyle: "italic",
          }}>
          Our mission to empower every individual and organization to achieve
          more starts with trusting each other. This app is committed to
          providing reasonable resources and qualified reading materials .
        </Text>
        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontStyle: "italic",
          }}>
          We urge to give people the power to build community and bring the
          world closer together. To help advance this mission, we provide the
          Products and Services described Below
        </Text>
        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          1. Provide a Personalised experience for you
        </Text>
        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          2. Connect you relevant academics and organisations you care about
        </Text>
        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          3. Empower you to express yourself and communicate about what matters
          to you
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 2,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          4. Help you discover content, products, and services that may interest
          you
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          5. use and develop advanced technologies to provide safe and
          functional services for everyone
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          6. Reserch ways to make our services better
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          6. Provide consistent and seamless experience
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}>
          7. Provide global access to our services
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 10,
            marginLeft: 10,
            fontSize: 15,
          }}>
          8. We want students to use our products to express themselves and to
          share content that is important to them, but not at the expense of the
          safety and well-being of others.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});

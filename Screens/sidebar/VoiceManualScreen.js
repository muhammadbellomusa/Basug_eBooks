import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from "@react-navigation/native";
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
const VoiceManualScreen = ({navigation}) => {
 const { colors } = useTheme();

    useLayoutEffect(()=>{
        navigation.setOptions({
        title:"Voice Recognition Manual"
        })
        },
        [navigation])


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
      <Text style={[styles.title,{color:colors.text}]}>Voice Recognition Commands</Text>
      <Text style={[styles.subtitle,{color:colors.text}]}>Navigation Commands:</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Science</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Arts</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Medicine</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Management</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Social Management</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Agriculture</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Pharmacy</Text>
      <Text style={[[styles.command,{color:colors.text}]]}>- Go to Faculty of Law</Text>
      <Text style={styles.subtitle}>Department Commands:</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Math Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Computer Science</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Chemistry Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Biology Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to English Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Arabic Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Computer Education Department</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Hausa Department</Text>
      
      <Text style={[styles.command,{color:colors.text}]}>- Go to Level One</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Level Two</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Level Three</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Level Four</Text>
      <Text style={styles.subtitle}>Other Commands:</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Manual Screen</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go back</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go home</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Open drawer</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Close drawer</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Profile</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Edit Profile</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to eBooks</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Search Screen</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to School Portal</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to Settings</Text>
      <Text style={[styles.command,{color:colors.text}]}>- Go to My School Profile</Text>
      </ScrollView>
    </View>
  )
}

export default VoiceManualScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
      },
      command: {
        fontSize: 16,
        marginBottom: 4,
      },
})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input,Button } from '@rneui/themed'

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
    
      <Input placeholder='Enter Your Email' />
      <Button title="Reset Password" />
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
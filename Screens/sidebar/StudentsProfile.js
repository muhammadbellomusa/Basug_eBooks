import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as React from 'react';
import { WebView } from 'react-native-webview';
  import { useState } from 'react';
const StudentsProfile = () => {




  const [isLoading, setIsLoading] = useState(true);
  const handleLoadEnd = () => {
    setIsLoading(false);
  }
  return (
    
  <View style={{ flex: 1 }}>
    {isLoading && (
      <ActivityIndicator
        // style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        size="large"
        color="black"
      />
    )}
    
    <WebView
      source={{ uri: "https://basug.safsrms.com/" }}
      onLoadEnd={handleLoadEnd}
      renderLoading={() => <ActivityIndicator size="large" color="black" />}
      style={{ flex: 1 }}
    />
  </View>
  )
}

export default StudentsProfile

const styles = StyleSheet.create({
  activityContainer:{
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    backgroundColor:'black',
    height:'100%',
    width:'100%'
  }
})
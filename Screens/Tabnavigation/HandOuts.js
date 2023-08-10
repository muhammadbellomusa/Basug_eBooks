import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as React from 'react';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const HandOuts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadEnd = () => {
    setIsLoading(false);
  }

  return (
  
    <View style={{ flex: 1}}>
    {isLoading && (
      <ActivityIndicator
        // style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        size="large"
        color="black"
      />
    )}
    
    <WebView
      source={{ uri: "https://basug.edu.ng/" }}
      onLoadEnd={handleLoadEnd}
      renderLoading={() => <ActivityIndicator size="large" color="black" />}
      style={{ flex: 1 }}
    />
  </View>

   
  )
}

export default HandOuts

const styles = StyleSheet.create({
  container:{
    marginTop:0
  }
})
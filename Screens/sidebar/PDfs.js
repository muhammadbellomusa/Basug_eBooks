import React, { useState, useRef , useEffect, useLayoutEffect,useContext} from 'react';
import { View, TextInput, Button, Text, ActivityIndicator ,TouchableOpacity, StyleSheet,ScrollView,Alert} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Linking } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';
import { getStorage, ref, deleteObject } from '@react-native-firebase/storage';
import useVoiceRecognitionScreen from '../useVoiceRecognitionScreen';

const  PDFs = ({navigation}) => {
  const [pdfName, setPDFName] = useState('');
  const [pdfUri, setPDFUri] = useState('');
  const [uploading, setUploading] = useState(false);
  const uploadTaskRef = useRef(null);
  const [pdfs, setPDFs] = useState([]);
  const { colors } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const { recognizedText, startListening } = useVoiceRecognitionScreen();


   bs = React.createRef();
   fall = new Animated.Value(1);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "PDFs",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
           {allowedEmails.includes(user.email) ? ( 

          <TouchableOpacity>
          <FontAwesome5.Button
                name="upload"
                size={22}
                backgroundColor="orange"
                color="navy"
                onPress={() => bs.current.snapTo(0) }
              />
          </TouchableOpacity>
    ): null }

<TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={24}
            style={{backgroundColor:"orange"}}
            color="navy"
            borderRadius={30}
            backgroundColor="whitesmoke"
            onPress={startListening}
          />
        </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);



  useEffect(() => {
    const unsubscribe = firestore()
      .collection('P-D-F')
      .onSnapshot((querySnapshot) => {
        const pdfList = [];
        querySnapshot.forEach((doc) => {
          const { name, downloadUrl } = doc.data();
          const id = doc.id;
          pdfList.push({id, name, downloadUrl });
        });
        setPDFs(pdfList);
      });

    return () => unsubscribe();
  }, []);


  const handleDelete = async (pdfId, pdfName) => {
    try {
      const pdfRef = firestore().collection('P-D-F').doc(pdfId);
      const pdfDoc = await pdfRef.get();

      if (pdfDoc.exists) {
        const { name, url } = pdfDoc.data();

        const storage = getStorage();
        const storageRef = ref(storage, `'P-D-F'/${pdfName}`);

        await deleteObject(storageRef);
        await pdfRef.delete();

        // Update the state to remove the deleted PDF from the screen
        setPDFs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
      } else {
        console.log('PDF document does not exist');
      }
    } catch (error) {
      console.log('Error deleting PDF:', error);
    }
  };





  const handleDownloadPDF = (downloadUrl) => {
    Linking.openURL(downloadUrl);
  };







  const handlePickPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        // type: [DocumentPicker.types.pdf], // Only allow PDF files
      });

      if (res) {
        setPDFName(res.name);
        setPDFUri(res.uri);
      }
    } catch (error) {
      console.log('Error picking PDF:', error);
    }
  };

  const handleUploadPDF = async () => {
    if (pdfName && pdfUri) {
      try {
        setUploading(true);

        const storageRef = storage().ref(`'P-D-F'/${pdfName}`);
        const uploadTask = storageRef.putFile(pdfUri);
        uploadTaskRef.current = uploadTask;

        await uploadTask;

        const downloadUrl = await storageRef.getDownloadURL();

        await firestore().collection('P-D-F').add({
          name: pdfName,
          downloadUrl: downloadUrl,
        });

        console.log('PDF uploaded successfully!');
        alert("PDF uploaded Successfully")
      } catch (error) {
        console.log('Error uploading PDF:', error);
        alert("error uploading PDF", error)
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCancelUpload = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
      setUploading(false);
      console.log('Upload canceled');
    }
  };


  const renderInner = () => (
    <View style={[styles.panel, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: "center", marginBottom: -35 }}>
        <Text style={[styles.panelTitle, { color: colors.text }]}>
          Upload a PDF
        </Text>
        <Text style={[styles.panelSubtitle, { color: colors.text }]}>
          Upload a PDF
        </Text>
      </View>
      <View>
      <TextInput
        value={pdfName}
        onChangeText={setPDFName}
        placeholder="PDF Name"
        style={{borderWidth:1,padding:5,borderRadius:12}}
      />
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={handlePickPDF}>
        <Text style={styles.panelButtonTitle}>Select a PDF</Text>
      </TouchableOpacity>
      {pdfName ? <Text>Selected PDF: {pdfName}</Text> : null}
      {uploading ? (
        <View style={{margin:8}}>
          <ActivityIndicator size="large" />
          <TouchableOpacity style={styles.panelButton} onPress={handleCancelUpload}>
        <Text style={styles.panelButtonTitle}>cancel upload</Text>
      </TouchableOpacity>

        </View>
      ) : null}
    
      <TouchableOpacity style={styles.panelButton} onPress={handleUploadPDF}>
        <Text style={styles.panelButtonTitle}>Upload</Text>
      </TouchableOpacity>
     
          <TouchableOpacity
        style={[styles.panelButton, { backgroundColor: "#ff7f50" }]}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
     
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View
        style={[styles.panelHeader, { backgroundColor: colors.background }]}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );


  const allowedEmails = ["h@gmail.com", "csc@basug.com", "mth@basug.com", "bio@basug.com","pharm@basug.com",
  "econ@basug.com", "ana@basug.com", "phy@basug.com", "chm@basug.com","eng@basug.com",
  "agr@basug.com", "law@basug.com", "hau@basug.com", "ara@basug.com", "isl@basug.com",
  "edu@basug.com", "soc@basug.com", "pbh@basug.com", "pol@basug.com", "bam@basug.com",
  "pba@basug.com", "phc@basug.com", "lis@basug.com", "slt@basug.com", "mcb@basug.com",
  "bch@basug.com"
        ];


  return (
  

<View behavior="height" style={styles.container}>
<BottomSheet
ref={bs}
snapPoints={[330, 0]}
renderContent={renderInner}
renderHeader={renderHeader}
initialSnap={1}
callbackNode={fall}
enabledGestureInteraction={true}
/>
<Animated.View
style={{
  margin: 20,
  opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
}}
>

</Animated.View>

<View >
<ScrollView showsVerticalScrollIndicato={false}   >

{pdfs.map((pdf, index) => (
    <View style={{margin:15,flexDirection:"row",justifyContent:"space-between"}} key={index}>

        <TouchableOpacity onPress={() => handleDownloadPDF(pdf.downloadUrl)}
         style={{borderWidth:1,borderColor:"#ff7f50", borderRadius:15, padding:10,backgroundColor:"pink"}}>        
          <Text key={index}style={{color:"black"}} >{pdf.name}</Text>
        </TouchableOpacity>
        {allowedEmails.includes(user.email) ? (
        <FontAwesome5.Button
                name="trash"
                size={22}
                style={{marginHorizontal:10,borderRadius:30}}
                color="#fff"
                borderRadius={30}
                backgroundColor="#ff7f50"
                onPress={()=> Alert.alert("Delete", "Are you sure you want to delete?",[
                  {text:"yes", onPress:() => handleDelete(pdf.id, pdf.name)},
                  {text:"no", style:"cancel"}
                  ]) }
              />
              ) : null }
        
</View>

      ))
      
      
      }
</ScrollView>

    </View>

</View>

  );
};

export default  PDFs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "brown",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "white",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "white",
    shadowColor: "#333333",
    elevation: 8,
    shadowOffset: { width: -1, height: 3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "grey",
    height: 30,
    marginBottom: 30,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "brown",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",

    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",

    justifyContent: "flex-end",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
})



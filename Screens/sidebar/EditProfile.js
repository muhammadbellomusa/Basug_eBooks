import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { AuthContext } from "../../navigation/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import useVoiceRecognitionScreen from "../useVoiceRecognitionScreen";
import { useLayoutEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const EditProfile = ({ navigation }) => {
  const { colors } = useTheme();
  const [userData, setUserData] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const { user, logout } = React.useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const { recognizedText, startListening } = useVoiceRecognitionScreen();

  useLayoutEffect(() => {
    navigation.setOptions({

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          
          <TouchableOpacity style={{ justifyContent:"center",alignItems:"center",bottom:5,flexDirection:"row" }}>
          <Text>{recognizedText}</Text>
          <FontAwesome5.Button
            name="microphone"
            size={28}
            color="navy"
            borderRadius={30}
            backgroundColor="orange"
            onPress={startListening}
          />
        </TouchableOpacity>

     


        </View>
      ),
    });
  }, [navigation]);






  const getUser = async () => {
    const currentUser = await firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("User Data: ", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();
    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }
    firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        about: userData.about,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: imgUrl,
      })
      .then(() => {
        console.log("User Updated");
        Alert.alert(
          "Profile Updated",
          "Your Profile has been updated successfully"
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      // console.log(
      //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      // );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    bs.current.snapTo(1);
    // const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const snapImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    bs.current.snapTo(1);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderInner = () => (
    <View style={[styles.panel, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: "center", marginBottom: -35 }}>
        <Text style={[styles.panelTitle, { color: colors.text }]}>
          Upload Photo
        </Text>
        <Text style={[styles.panelSubtitle, { color: colors.text }]}>
          Chose Your Profile Picture
        </Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={snapImage}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Chose From Library</Text>
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

  let bs = React.createRef();
  let fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
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
          opacity: Animated.add(0.1, Animated.multiply(fall, 1)),
        }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      "https://th.bing.com/th/id/R.018fdbf00d67f32a9ebd804add2573c2?rik=zaKROXFdqr%2fqVA&riu=http%3a%2f%2fwww.caribbeangamezone.com%2fwp-content%2fuploads%2f2018%2f03%2favatar-placeholder.png&ehk=tdznBvU%2bCJ0xW0CofPO8CASu4UGxugfYPeT8v%2f0xX1E%3d&risl=&pid=ImgRaw&r=0"
                    : "https://th.bing.com/th/id/R.018fdbf00d67f32a9ebd804add2573c2?rik=zaKROXFdqr%2fqVA&riu=http%3a%2f%2fwww.caribbeangamezone.com%2fwp-content%2fuploads%2f2018%2f03%2favatar-placeholder.png&ehk=tdznBvU%2bCJ0xW0CofPO8CASu4UGxugfYPeT8v%2f0xX1E%3d&risl=&pid=ImgRaw&r=0",
                }}
                style={{ width: 100, height: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="white"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text,
            }}>
            {userData ? userData.fname : ""} {userData ? userData.lname : ""}
          </Text>
          {uploading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{color:colors.text}}>{transferred}% completed</Text>
              <ActivityIndicator style={{color:colors.text}} size="large" color="maroon" />
            </View>
          ) : (
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                textAlign: "center",
                color: colors.text,
              }}>
              {userData ? userData.about : ""}
            </Text>
          )}
        </View>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            size={20}
            color={colors.text}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.fname : ""}
            onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            size={20}
            color={colors.text}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.lname : ""}
            onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
          />
        </View>

        <View style={styles.action}>
          <Ionicons
            name="ios-clipboard-outline"
            color="#333333"
            size={20}
            style={{ marginRight: 5, color: colors.text, marginBottom: 10 }}
          />

          <TextInput
            placeholder="About Me"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.about : ""}
            onChangeText={(txt) => setUserData({ ...userData, about: txt })}
          />
        </View>

        <View style={styles.action}>
          <Feather
            name="phone"
            size={20}
            color={colors.text}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Phone "
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.phone : ""}
            onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome
            name="globe"
            size={20}
            color={colors.text}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.country : ""}
            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
          />
        </View>

        <View style={styles.action}>
          <Icon
            name="map-marker-outline"
            size={20}
            color={colors.text}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[styles.TextInput, { color: colors.text }]}
            value={userData ? userData.city : ""}
            onChangeText={(txt) => setUserData({ ...userData, city: txt })}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;

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
});

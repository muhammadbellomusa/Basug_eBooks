import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from "../styles/FeedStyles";
import { useContext, useState } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import moment from "moment/moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";

const PostCard = ({ item, onDelete, onPress }) => {
  const { logout, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  let likeIcon = item.liked ? "heart" : "heart-outline";
  let likeIconColor = item.liked ? "#2e64e5" : "#333";
  let likeText;
  let commentText;
  if (item.likes == 1) {
    likeText = "1 like";
  } else if (item.likes > 1) {
    likeText = item.likes + " likes";
  } else {
    likeText = "like";
  }

  if (item.comments == 1) {
    commentText = "1 comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " comments";
  } else {
    commentText = "comment";
  }

  const getUser = async () => {
    await firestore()
      .collection("users")
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card>
      <UserInfo>
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>
              {userData ? userData.lname || "User" : "User"}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== null ? (
        <PostImg source={{ uri: item.postImg }} />
      ) : (
        <Divider />
      )}
      {/* <PostImg source={require("../assets/posts/post-img-2.jpg")} /> */}

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>

        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
            <InteractionText>{commentText}</InteractionText>
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;

const styles = StyleSheet.create({});

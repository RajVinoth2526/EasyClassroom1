import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  keyboardVerticalOffset,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import * as firebase from "firebase";
//import { UploadPost } from '../../../../API/firebaseMethods/firebaseMethod';
//import IMAGE from '../../../assets/photo.png';
import { MaterialIcons } from "@expo/vector-icons";
import { CreateNotice } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";

export default function AddNoticeScreen({ navigation, route }) {
  const [notice, setNotice] = useState("");
  const [title, setTitle] = useState("");
  const { type } = route.params;

  const id = uuid.v4();
  let currentUserUID = firebase.auth().currentUser.uid;

  const handlePress =  async() => {

    const ProfileUrl = await firebase
    .storage()
    .ref()
    .child("profileImage/" + currentUserUID) //name in storage in firebase console
    .getDownloadURL()
    .catch((e) => console.log("Errors while downloading => ", e));

    if (!notice) {
      Alert.alert("Text required");
    } else if (!title) {
      Alert.alert("title required");
    } else {
      CreateNotice(id, notice, title, type,ProfileUrl);
      navigation.goBack();
      Alert.alert("Notice Uploaded!");
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.postName}>
       <Text style={{ fontSize: 30 }}><MaterialIcons name="post-add" size={35}color="black"/>Create Notice</Text>
      </View>

      <ScrollView>
        <View style={[styles.homeContent, { backgroundColor: "#88e1fc" }]}>
        
            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
              Title
            </Text>
           
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title) => setTitle(title)}
                />
              </View>
           

            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
              Content
            </Text>
           
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={notice}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(notice) => setNotice(notice)}
                />
              </View>
            
        
        </View>

        
      </ScrollView>
      <View style={styles.iconAdd}>
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome
              name="send"
              size={30}
              color="#38deff"
              style={{ alignSelf: "center" }}
            />
            <Text style={{ alignSelf: "center", fontWeight: "900" }}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,

    backgroundColor: "white",
  },
  iconAdd: {
    alignSelf: "center",
    marginTop:'5%',
    marginBottom: '10%',
  },
  avatar: {
    marginTop: 30,
    alignSelf: "center",
  },
  postName: {
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 10,
    alignItems: "center",
  },
  scrollScreen: {
    height :'80%',
    marginTop: 5,
    borderRadius: 1,
    marginLeft: 10,
    backgroundColor: "white",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.5,
  },
  homeContent: {
    alignSelf: "center",

    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#f2ffff",
    height: 500,
    width: 330,
    marginLeft: -10,
    marginRight: -10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 6,
    shadowRadius: 20,
    elevation: 5,
  },
  homeContentText: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
  },
  head: {
    alignSelf: "center",
    marginTop: 20,
  },
  headText: {
    fontSize: 20,
    marginBottom: 10,
  },
  addPhotoName: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 8,
  },
  photoUpload: {
    marginTop: 20,
  },
  textinput: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#8af7ff",
    backgroundColor: "#ffffff",

    paddingRight: 20,
    padding: 10,
  },
});

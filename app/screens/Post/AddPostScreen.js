import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
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
import { UploadPostImage } from "../../../API/firebaseMethods/firebaseMethod";
import IMG from "../../assets/profile-placeholder.png";
import IMAGE from '../../assets/photo.png';
import { MaterialIcons } from "@expo/vector-icons";
import { UploadPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddPostScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
  const exampleImageUri1 = Image.resolveAssetSource(IMG).uri;
  const [image1, setImage1] = useState(exampleImageUri1);
  const [isLoading, setisLoading] = useState(false);
 

  const [ID] = useState(uuid.v4());
  let currentUserUID = firebase.auth().currentUser.uid;
 
  
 

  const handlePress =  async() => {

   

    const ProfileUrl = await firebase
    .storage()
    .ref()
    .child("profileImage/" + currentUserUID) //name in storage in firebase console
    .getDownloadURL()
    .catch((e) => console.log("Errors while downloading => ", e));
      const url = await firebase
        .storage()
        .ref()
        .child("PostImage/" + ID) //name in storage in firebase console
        .getDownloadURL()
        .catch((e) => console.log("Errors while downloading => ", e));


    if (!message) {
      Alert.alert("Text required");
    } else if (!title) {
      Alert.alert("title required");
    } else {
      
      UploadPost(ID, message, title,url,ProfileUrl);
      navigation.goBack();
      Alert.alert("Post Uploaded!");
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
    
    setImage(result.uri);
    
  
    
    if (!result.cancelled) {
      setisLoading(true);
      UploadPostImage(result.uri, ID)
        .then(() => {
          setisLoading(false);
          console.log("Uploaded");
        })
        .catch((error) => {
          Alert.alert("Error:", error.message);
        });
    }
  };

  if(isLoading == true){
    return(
    <View style={styles.Loadingcontainer}>
      <Text>Image Uploading Please wait!</Text>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.postName}>
        <Text style={{ fontSize: 30, marginTop: 5 }}><MaterialIcons
        name="post-add"
        size={30}
        color="black"
        
      />Create Post</Text>
      </View>

      <ScrollView style = {styles.scrollScreen}>
        <View style={[styles.homeContent, { backgroundColor: "#88e1fc" }]}>
         

            <View style={styles.avatar}>
                <Image
                  
                  source={{ uri: image }}
                  style={{
                    borderRadius: 3,
                   
                    height: 200,
                    width: 300,
                  }}
                />
              </View>
              <View style={styles.photoUpload}>
                <MaterialCommunityIcons
                  onPress={pickImage}
                  name="image-plus"
                  size={30}
                  color="black"
                />
              </View>
            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
              Title
            </Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  autoComplete="off"
                  value={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title) => setTitle(title)}
                />
              </View>
            </TouchableWithoutFeedback>

            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
              Content
            </Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  placeholder="Type here"
                  value={message}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(message) => setMessage(message)}
                />
              </View>
            </TouchableWithoutFeedback>
          
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
    marginTop :'3%',
    marginBottom :'2%'
  },
  avatar: {
    marginTop: 30,
    alignSelf: "center",
  },
  postName: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
    height: 60,
    width: 290,
    borderRadius: 10,
    alignItems: "center",
  },
  scrollScreen: {
    marginTop: '2%',
    width:'100%',
    height :'90%',
    marginBottom :'2%',
    backgroundColor: "white",
    borderRadius:10,
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
    marginBottom: '10%',
    backgroundColor: "#f2ffff",
    width:'98%',
    height:'100%',

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 6,
    shadowRadius: 20,
    elevation: 0.5,
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
    alignSelf :'flex-end',
    marginRight :'10%',
  },
  textinput: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#8af7ff",
    backgroundColor: "#e3f8ff",

    paddingRight: 20,
    padding: 10,
  },
  avatar: {
    marginTop: 20,
    borderRightColor:'black',
    borderRadius:3,
    borderWidth:1,
    marginBottom: 30,
    borderRadius: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

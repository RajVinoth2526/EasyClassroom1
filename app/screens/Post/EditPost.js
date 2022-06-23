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
import IMAGE from '../../assets/photo.png';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EditPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { set } from "react-native-reanimated";

export default function EditPostScreen({ navigation, route }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [message1, setMessage1] = useState("");
  const [title1, setTitle1] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
  const { PostID } = route.params; 
  const [isLoading, setisLoading] = useState(false);


  

  const handlePress = () => {
    if(!message1 ){
     EditPost(PostID, message, title1,image);
     navigation.replace("Dashboard");
     Alert.alert("Post Updated!!");
   }if(!title1){
     EditPost(PostID, message1, title,image);
     navigation.replace("Dashboard");
     Alert.alert("post Updated!!");
   }if(!message1 && !title1){
     EditPost(PostID, message, title,image);
     navigation.replace("Dashboard");
     Alert.alert("post Updated!!");
   }if(title1 && message1){
     EditPost(PostID, message1, title1,image);
     navigation.replace("Dashboard");
     Alert.alert("post Updated!!");

   }
 };

 useEffect(() => {
  firebase
    .storage()
    .ref()
    .child("PostImage/" + PostID) //name in storage in firebase console
    .getDownloadURL()
    .then((url) => {
      setImage(url);
     
    })
    .catch((e) => console.log("Errors while downloading => ", e));
}, []);

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  setImage(result.uri);
  // console.log(result);

  if (!result.cancelled) {
    setisLoading(true);
    UploadPostImage(result.uri, PostID)
      .then(() => {
        setisLoading(false);
        console.log("Uploaded");
      })
      .catch((error) => {
        Alert.alert("Error:", error.message);
      });
  }


};


  
  


  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("Posts")
        .doc(PostID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setMessage(dataObj.message);

        setTitle(dataObj.title);
      }
    }
    getUserInfo();
  });

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
        <Text style={{ fontSize: 30, marginTop: 5 }}> <MaterialIcons
        name="post-add"
        size={35}
        color="black"
       
      />Edit Post</Text>
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
           
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  defaultValue={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title1) => setTitle1(title1)}
                />
              </View>
            

            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
              Content
            </Text>
            
              <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                 
                  defaultValue={message}
                 
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(message1) => setMessage1(message1)}
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
    marginTop :'4%',
    marginBottom: '3%',
  },
  avatar: {
    marginTop: 30,
    alignSelf: "center",
  },
  postName: {
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
  
  },
  scrollScreen: {
   
    borderRadius: 1,
    height :'100%',
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
    width :'100%',
    marginTop: 5,

    backgroundColor: "#f2ffff",
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
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    alignSelf:'flex-end',
    marginRight: '3%'
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
});

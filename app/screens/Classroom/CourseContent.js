import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import * as firebase from "firebase";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Level1Screen from "./Level1Screen";
import Level3Screen from "./Level3Screen";
import Level2Screen from "./Level2Screen";
import uuid from "react-native-uuid";
import { MaterialIcons } from "@expo/vector-icons";
import { StoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { StoreCourseLink } from "../../../API/firebaseMethods/firebaseMethod";
export default function CourseContent({ navigation,route }) {

    const [ID] = useState(uuid.v4());
    const [ID1] = useState(uuid.v4());
    const [instruction, setinstruction] = useState("");
    const [title, setTitle] = useState("");
    const [document, setDocument] = useState("");
    const [isLoading, setisLoading] = useState(false);
  


  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseID } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { Year } = route.params;
  
  console.log(Faculty);
  console.log(Department);
  console.log(Level);
  console.log(CourseID);
  console.log(CourseName);
  console.log(CoursenameID);
  console.log(Year);


  const currentUser = firebase.auth().currentUser;

  
        const pickDocument = async () => {
          let result = await DocumentPicker.getDocumentAsync({});


          if (!result.cancelled) {
            setisLoading(true);
            StoreCourseLink(ID1,result.uri)
              .then(() => {
                setDocument(result.uri);
                setisLoading(false);
                console.log("Uploaded");
              })
              .catch((error) => {
                Alert.alert("Error:", error.message);
              });
          }
          
         
        };

      
      

  const handlePress =  async() => {

    const Url = await firebase
    .storage()
    .ref()
    .child("CourseLink/" + ID1) //name in storage in firebase console
    .getDownloadURL()
    .catch((e) => console.log("Errors while downloading => ", e));

    if (!instruction) {
      Alert.alert("Text required");
    } else if (!title) {
      Alert.alert("title required");
    }else if(!document){
      Alert.alert("document empty");
    } else {
      StoreCourse(
        ID,
        currentUser.uid,
        Faculty,
        Department,
        Level,
        Year,
        CourseName,
        CourseID,
        CoursenameID,
        title,
        instruction,
        Url
        
        );
      navigation.goBack();
      Alert.alert("Uploaded!");
    }
  };

  if(isLoading == true){
    return(
    <View style={styles.Loadingcontainer}>
      <Text>Please wait!</Text>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
    );
  }
 
  return (
    
    <View style={styles.container}>
      
    <View style={styles.postName}>
     <Text style={{ fontSize: 30 }}><MaterialIcons name="post-add" size={35}color="black"/>Create Chapter</Text>
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
                value={instruction}
                multiline={true}
                numberOfLines={10}
                textAlignVertical="top"
                onChangeText={(instruction) => setinstruction(instruction)}
              />
            </View>

            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 10 }}>
            Upload Document
          </Text>

          <View style={{flexDirection:"row"}}>
            <View style={{width:250,marginLeft:'3%',marginRight:'3%',marginTop:'2%',height:40, borderRadius:25, backgroundColor:'#ffffff'}}>
            <Text style= {{fontSize:10 , alignSelf:'center',paddingLeft:15,paddingRight:10}}>{document}</Text>
            </View>
            
            <TouchableOpacity onPress={pickDocument}>
          <FontAwesome
            name="send"
            size={10}
            color="black"
            style={{ alignSelf: "center",paddingTop:10 }}
          />
          <Text style={{ alignSelf: "center", fontSize:10, fontWeight: "900" }}>
            Upload
          </Text>
        </TouchableOpacity>

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

  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});


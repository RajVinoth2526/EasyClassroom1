import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";

import {signInWithpasswordAndPassword, sendPasswordResetpassword,} from "firebase/auth";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { StudentEntroll } from "../../../API/firebaseMethods/firebaseMethod";
export default function EntrolCourseScreen({ navigation,route }) {

  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { UserID } = route.params;
  
    const { Password } = route.params;
    const { CourseID } = route.params;
    const [password, setPassword] = useState("");

  const currentUser = firebase.auth().currentUser;
  console.log(Password);
  console.log(CourseID);
  const handlePress = () => {
    if (!password) {
      Alert.alert("password field is required.");
    }
    
    if(password == Password){
        setPassword("");
        StudentEntroll(currentUser.uid,CourseID);
        navigation.navigate("CourseScreen",{Faculty : Faculty,Department : Department,Level :Level,CourseName:CourseName,CourseID : CourseID,CoursenameID:CoursenameID,UserID:USerID});

    }else{
        Alert.alert("wrong Key");
    }

    
  
  
   
   

   
  };


 
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  return (
    <View style={styles.container}>
      

     

      

      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={{alignSelf:'center' ,marginBottom:'10%',marginTop:'30%'}}>
          <FontAwesome5 name="user-lock" size={60} color="#34dbeb" />
          </View>
     
      <View style = {{marginTop:'5%', marginBottom:'15%'}}>
        <Text style = {{alignSelf:'center', fontSize:35}}>Entroll Course</Text>
      </View>
        <ScrollView style={{ height: 175 }}>
        
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Entoll Key</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                style={styles.textinput}
              />
            </View>
          </View>
      

          
        </ScrollView>
        </KeyboardAvoidingView>
    

      <TouchableOpacity style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>Entroll</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 10,
    backgroundColor: "#ffffff",
  },

  cardCont: {
   
    marginLeft: 40,
    padding: 5,
    width: "80%",
  },
  text: {
   
    fontWeight: "bold",
    fontSize: 15,
  },

  cardtext: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inlineText: {
    color: "blue",
    marginTop:'10%',
    alignSelf: "center",
  },

  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    
    marginBottom: '10%',
    alignItems: "center",
    padding: 10,
  },
  action: {
    marginTop: 5,

    borderRadius: 10,
    paddingBottom: 5,
    marginBottom: 20,

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  textinput: {
    color: "black",
    padding: 7,
    fontSize: 20,
    paddingLeft: 8,
  },

  buttonLogin: {
    backgroundColor: "#8be5f7",
    alignSelf: "center",
    height: 50,
    borderRadius: 9,
    paddingTop: 3,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 8,
    elevation: 7,
  },

  buttontext: {
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 2,
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 200,
    height: 200,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

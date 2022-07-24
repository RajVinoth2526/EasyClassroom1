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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";

import {signInWithEmailAndPassword, sendPasswordResetEmail,} from "firebase/auth";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

 async function  forgotPassword (email) {
    await firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Please check your email address Inbox  ' +email)
      }).catch(function (e) {
        console.log(e)
        alert("please enter valid email address");
      })
  }

  const handlePress = () => {
    if (!email) {
      Alert.alert("email field is required.");
    }else{

      forgotPassword(email);
      setEmail("");
      setPassword("");

    }

    
  
  
   
   

   
  };


  if(isLoading == true){
    return(
    <View style={styles.Loadingcontainer}>
      
      <ActivityIndicator color="#03befc" size="large" />
    </View>
    );
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  return (
    <View style={styles.container}>
      

     

      

      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={{alignSelf:'center' ,marginBottom:hp('5%'),marginTop:hp('15%')}}>
          <FontAwesome5 name="user-lock" size={65} color="#34dbeb" />
          </View>
     
      <View style = {{marginTop:hp('5%'), marginBottom:hp('5%')}}>
        <Text style = {{alignSelf:'center', fontSize:hp('4%'), fontWeight:'bold'}}>Reset Password</Text>
      </View>
        <ScrollView style={{ height: 175 }}>
        
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Email</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                style={styles.textinput}
              />
            </View>
          </View>
      

          
        </ScrollView>
        </KeyboardAvoidingView>
    

      <TouchableOpacity style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>Reset</Text>
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
    justifyContent:'center',
    borderRadius: 9,
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
    fontSize: hp('3%'),
    fontWeight: "bold",
    alignSelf: "center",
   
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

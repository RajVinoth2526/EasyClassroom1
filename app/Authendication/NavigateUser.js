
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { ActivityIndicator} from 'react-native';
import { loggingOut } from '../../API/firebaseMethods/firebaseMethod';

export default function Dashboard({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      let doc = await firebase
      .firestore()
      .collection('users')
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName) 
        setRole(dataObj.role)

        if(dataObj.role == "Admin"){
          navigation.replace('Admin');

        }
        else if(dataObj.role =="Demo"){
          navigation.replace('Demo');
        }else if(dataObj.role =="Lecturer"){
          navigation.replace('Lecturer');
        }else if(dataObj.role =="Student"){
          navigation.replace('Lecturer');
        }
        
      }
    }
    getUserInfo();
  })

  

  return (
    <View style={styles.container}>
    <ActivityIndicator size='large' />
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
   
    backgroundColor: "#C0C0C0",
  },

  cardCont: {
    marginTop: 20,
    

    
  },

  cardtext: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  action: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginBottom: 5,
  },

  textinput: {
    color: "black",
    fontSize: 15,
  },

  buttonSignup: {
    width: "30%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#808000",
    top: 40,
    marginBottom:5,
    alignSelf: "center",
  },
  buttonSignIn: {
    
    width: "30%",
    height: 35,
    borderRadius: 10,
    textAlign:'center',
    backgroundColor: "#808000",
    alignSelf: "center",
  },

  inlineText:{
    color:'blue',
    marginTop:35,
    
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },
});
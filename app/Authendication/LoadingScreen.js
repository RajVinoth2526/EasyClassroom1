import React from 'react';
import { ActivityIndicator, StyleSheet, View ,Text,Image} from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";

export default function LoadingScreen({ navigation }){

  

    firebase.auth().onAuthStateChanged(function(user){
          if (user) {
             navigation.navigate('Dashboard');

          }else {
              navigation.navigate('Home'); 
            }
          });


    


  return (
    <View style={styles.container}>
     
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text style={{color: 'black', fontSize: 12,marginBottom:20, marginStart:-10}}>Easy Classroom</Text>
        <ActivityIndicator color="blue" size="large" />
     
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },

  logo: {
    
    width: 150,
    height: 150,
    marginBottom:-40,
    marginTop:-60
  },
  
});
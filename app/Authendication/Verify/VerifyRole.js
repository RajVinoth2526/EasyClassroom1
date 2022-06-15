
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CodeInput from 'react-native-confirmation-code-input';
import { StoreRole } from '../../../API/firebaseMethods/firebaseMethod';
import "firebase/firestore";






export default function VerifyRole({ navigation }) {


  const role1 = 'Lecturer';
  const role2 = 'Demonstrator';
  const role3 = 'Student';
  const role4 = 'Admin';
 

  const Verify = () => {

    
   
      navigation.navigate('Pin');


  }

  
  
  

  return (
    
   <View style = {styles.container}>
     <View style = {styles.head}>
       <Text style = {styles.headText}>Who You Are ?</Text>

     </View>
    
     <View style = {styles.select}>
    <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText}>Lecturer</Text>
       </TouchableOpacity>
     </View>

     <View style = {styles.select}>

       <TouchableOpacity  onPress= {Verify}>
         <Text style= {styles.selectText}>Demostrator</Text>
       </TouchableOpacity>
     </View>

     <View style = {styles.select}>

       <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText}>Student</Text>
       </TouchableOpacity>
     </View>

     <View style = {styles.select}>

       <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText}>Admin</Text>
       </TouchableOpacity>
     </View>
    <View style = {styles.selectSignIn}>
     <TouchableOpacity  onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.inlineText}>Already have an account?</Text>
     </TouchableOpacity>

     </View>

   </View>
    
  );
}

const styles = StyleSheet.create({

  container : {
   
    alignItems : 'center',
    backgroundColor :'white',
    flex:1

  },
  head :{
    marginTop : 120,
    alignSelf : 'center'
  },
  headText :{
   
    fontSize : 40,
  },
  select :{
    marginTop : 20,
    marginBottom :10,
    borderRadius : 20,
    alignItems : 'center',
    height : 60,
    width : '70%',
    shadowColor: "#000",
    backgroundColor : '#34dbeb',
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation:8 ,
  },
  selectText  :{

    alignSelf : 'center',
    fontSize : 25,
    marginTop : 10
  },
  inlineText : {

    marginTop : 5,
    fontSize : 15,
    color : 'blue'
  },
  selectSignIn :{
    marginTop : 40,
  }
  


 
});

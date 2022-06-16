
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import CodeInput from 'react-native-confirmation-code-input';
import { StoreRole } from '../../../API/firebaseMethods/firebaseMethod';
import "firebase/firestore";






export default function ClassroomWelcome({ navigation }) {


  const role1 = 'Lecturer';
  const role2 = 'Demonstrator';
  const role3 = 'Student';
  const role4 = 'Admin';
 

  const Verify = () => {

    
   
      navigation.navigate('Pin');


  }



  const generateRandomBrightestHSLColor=()=> {
	return "hsla(" + ~~(360 * Math.random()) + "," +
		"100%," +
		"90%,8)"
}

  
  
  

  return (
    
   <View style = {styles.container}>
     <View style = {styles.head}>
       <Text style = {styles.headText}><Entypo name="book" size={35} color="black" /> Classroom</Text>

     </View>
    
     <View style  = {[styles.select , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>
    <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText}>Level 1</Text>
       </TouchableOpacity>
     </View>

     <View style  = {[styles.select , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>

       <TouchableOpacity  onPress= {Verify}>
         <Text style= {styles.selectText}>Level 2</Text>
       </TouchableOpacity>
     </View>

     <View style  = {[styles.select , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>

       <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText} >Level 3</Text>
       </TouchableOpacity>
     </View>

     <View style  = {[styles.select , {backgroundColor : generateRandomBrightestHSLColor() }  ]}>

       <TouchableOpacity onPress= {Verify}>
         <Text style= {styles.selectText}>Level 4</Text>
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
    marginTop : '30%',
    marginBottom : '10%',
    alignSelf : 'center'
  },
  headText :{
   
    fontSize : 40,
  },
  select :{
    marginTop : '5%',
    marginBottom :'5%',
    borderRadius : 20,
    alignItems : 'center',
    height : 60,
    width : '70%',
    shadowColor: "#000",
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
    marginTop : '10%',
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

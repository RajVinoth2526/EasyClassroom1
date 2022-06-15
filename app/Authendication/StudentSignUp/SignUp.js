
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {StudentRegistration} from '../../../API/firebaseMethods/firebaseMethod';
import * as firebase from "firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";


export default function StudentSignUp({ navigation }) {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [DOB ,setDOB] = useState('');
  const [district ,setDistrict] = useState('');
  const [course , setCourse] = useState('');
  const [registrationNumber , setRegistrationNumber] = useState('');
  const [indexNumber , setIndexNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  //const [department, setDeparment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setGender('');
    setDOB('');
    setDistrict('');
    setCourse('');
    setRegistrationNumber('');
    setIndexNumber('');
    setFaculty('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!lastName) {
      Alert.alert('Last name field is required.');
    }else if (!registrationNumber) {
      Alert.alert('Last name field is required.');
    }else if (!indexNumber) {
      Alert.alert('Last name field is required.');
    }else if (!gender) {
      Alert.alert('gender field is required.');
    }else if (!district) {
      Alert.alert('District field is required.');
    }else if (!course) {
      Alert.alert('Course field is required.');
    }else if (!faculty) {
      Alert.alert('Faculty field is required.');
    }else if (!email) {
      Alert.alert('email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      StudentRegistration(
        email,
        password,
        lastName,
        firstName,
        registrationNumber,
        indexNumber,
        gender,
        district,
        course,
        faculty,
        
        
      );
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.text}>SignUp </Text>
      </View>
      <ScrollView style={styles.scrollView}>
   
     <View >
    <View style={styles.cardCont}>
        <Text style={styles.cardtext}>First Name</Text>
        <View style={styles.action}>
          <TextInput  
           style={styles.textinput}
           placeholder="First name"
           value={firstName}
           onChangeText={(name) => setFirstName(name)} />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Last Name</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Last name"
          value={lastName}
          onChangeText={(name) => setLastName(name)} />
        </View>
      </View>
      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>registration Number</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Registration Number"
          value={registrationNumber}
          onChangeText={(registrationNumber) => setRegistrationNumber(registrationNumber)} />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Index Number</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="index number"
          value={indexNumber}
          onChangeText={(indexNumber) => setIndexNumber(indexNumber)} />
        </View>
      </View>

      <View style={styles.cardCont}>
      <Text style={styles.cardtext}>
        <Text>
                {gender ?
                  ` Gender is ${gender}` :
                    "Select Gender"
                }
        </Text>
        </Text>

        <View style={styles.action}>
        <RNPickerSelect
          onValueChange={(gender)  => setGender(gender)}
         items={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
         
          
        ]} />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Faculty</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Enter your Faculty"
          value={faculty}
          onChangeText={(faculty) => setFaculty(faculty)}
           />
        </View>
      </View>
      
    <View style={styles.cardCont}>
        <Text style={styles.cardtext}>
          
        <Text>
                {course ?
                  ` ${course}` :
                    "Select course"
                }
            </Text>
        </Text>
        <View style={styles.action}>
        <RNPickerSelect
          onValueChange={(course)  => setCourse(course)}
         items={[
          { label: "Computer Science", value: "Computer Science" },
          { label: "Physical Science", value: "Physical SCience" },
          { label: "Bio SCience", value: "Bio SCience" },
          
        ]} />
        </View>
      </View>
      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>District</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Enter your district"
          value={district}
          onChangeText={(district) => setDistrict(district)}
           />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Email</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none" />
        </View>
      </View>

      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Password</Text>
        <View style={styles.action}>
          <TextInput  
         style={styles.textinput}
         placeholder="Enter your password"
         value={password}
         onChangeText={(password) => setPassword(password)}
         secureTextEntry={true} />
        </View>
      </View>
         

         
      <View style={styles.cardCont}>
        <Text style={styles.cardtext}>Retype Password</Text>
        <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder="Retype your password "
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true} />
        </View>
      </View>
        
      
         
          
      
     </View>
    </ScrollView>
        <TouchableOpacity  style={styles.buttonSignup} onPress={handlePress}>
           <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>

          
        <TouchableOpacity  onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.inlineText}>Already have an account?</Text>
        </TouchableOpacity>
  </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,

    backgroundColor: "#ffffff",
  },
  datePickerStyle: {
    width: 200,
  
  },
  scrollView: {
    marginTop:20,
    marginBottom: 15,
    borderRadius:15,
    backgroundColor: '#ffffff',
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 0.2,

  },

  cardCont: {
    marginTop: 10,
    alignSelf :'center',
    padding : 5,
    width:'80%',
  },
  text :{
    alignSelf : 'center',
    marginBottom : 20,
    fontSize : 30,
    fontWeight: 'bold',
  },

  cardtext: {
    marginLeft : 3,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  action: {
    marginTop: 5,
    
    borderRadius : 10,
    paddingBottom: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor :'white',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  textinput: {
    marginLeft : 10,
    color: "black",
    fontSize: 15,
  },

  buttonSignup: {
    backgroundColor: "#34dbeb",
    alignSelf: "center",
    height: 50,
    borderRadius: 9,
    marginTop : 90,
    marginBottom :20,
    paddingTop: 3, 
    width : '60%',
    marginTop : 10,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
    
  },
  
  SignUpText :{
    marginTop : 5,
    fontSize : 20,
    alignSelf: "center",
    fontWeight : 'bold',
  },
 

  inlineText:{
    color:'blue',
    marginTop:10,
    marginBottom : 20,
    alignSelf: "center",
    
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },
});

import React ,{useEffect,useState} from 'react';
import {Alert , ActivityIndicator, StyleSheet, View ,Text,Image} from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";


export default function LoadingPage({ navigation }){


  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [district, setDistrict] = useState('');
  const [faculty, setFaculty] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [indexNumber, setIndexNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [id, setId] = useState('');
  const [department, setDepartment] = useState('');

  

  useEffect(() => {
    async function getUserInfo(){
      let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName)
        setLastName(dataObj.lastName) 
        setIndexNumber(dataObj.indexNumber)
        setRegistrationNumber(dataObj.registrationNumber) 
        setFaculty(dataObj.faculty)
        setCourse(dataObj.course) 
        setGender(dataObj.gender)
        setEmail(dataObj.email)
        setId(dataObj.id);
        setDepartment(dataObj.department);
        setRole(dataObj.role) 
        setDistrict(dataObj.district)
       
      }


    }
    getUserInfo();


  })


  navigation.navigate('Dashboard');

   

 

   


   


 return (
   <View style={styles.container}>
    
       <Image
         style={styles.logo}
         source={require("../../assets/logo.png")}
       ></Image>
       <Text style={{color: 'black', fontSize: 40}}>Easy Classroom</Text>
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
   
   width: 200,
   height: 200,
 },
 
});
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";
import { greaterOrEq } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { StudentEntroll } from "../../../API/firebaseMethods/firebaseMethod";
export default function Level3Screen({ navigation }) {

  const[role, setRole] = useState('');
  const[flag, setFlag] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [AcademyYear, setAcademyYear] = useState([]);
 //const Year = "2021|2022";

  const level3 = "Level3";
  const[faculty, setFaculty] = useState('');
  const[department, setDepartment] = useState('');
  const [loading, setLoading] = useState('');
  const [isloading, setisLoading] = useState(false);
  const [year, setYear] = useState('');

  const currentUser = firebase.auth().currentUser;



 
  

  
  useEffect(() =>{

    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
  
      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setRole(dataObj.role);
        setFaculty(dataObj.faculty);
        setDepartment(dataObj.course);
        setYear(dataObj.academyYear);
        setLoading(false);
        setisLoading(true);
        console.log("fsd");
        
        
       
        
        
        
      }
    }

    getUserInfo();
 
 
     },[])


     useEffect(() =>{

      async function getYear() {
        const data = [];
        const querySnapshot = await firebase
          .firestore()
          .collection("AcademyYearForStudents")
          .get();
    
          querySnapshot.forEach((doc) => {
             
      
            
            data.push(doc.data());
           
           
          });
          setAcademyYear(data);
      }

      getYear();

     
   
   
       },[])
  
  useEffect(() =>{

     
      async function fetchSubjects() {
        console.log(faculty);
        console.log(department);
        console.log(level3);
        console.log(year);
        const data = [];
        const db = firebase.firestore();
        const querySnapshot = await  db.collection("CoursesName-"+faculty).doc(department).collection(level3).doc(year).collection("CourseNames").orderBy("created").get();
      
        querySnapshot.forEach((doc) => {
           
    
          
          data.push(doc.data());
         
         
        });
       
        setSubjects(data);
        setisLoading(false);
       
      }
     
      if(loading == false)
        fetchSubjects();
      
       
      
       },[loading])
    
  
      async function CheckEntoll(courseid,Entroll,CourseName,CoursenameID,UserID) {
       
        let doc = await firebase
        .firestore()
        .collection("entrollment")
        .doc(currentUser.uid)
        .collection("course")
        .doc(courseid)
        .get();

  
     
    
      console.log("fgwrdfsweiusdfiweg"+courseid);

      if (!doc.exists) {
        
        navigation.navigate("EntrollScreen",{Password : Entroll,Faculty : faculty,Department : department,Level :level3, Year : year,CourseID : courseid,CourseName:CourseName,CoursenameID:CoursenameID,UserID : UserID});
        
       
      } else {
        
        navigation.navigate("CourseScreen",{Faculty : faculty,Department : department,Level :level3,CourseID : courseid,CourseName:CourseName,CoursenameID:CoursenameID,Year : year,UserID : UserID});
       
        
      }

      
         
      }
  


     

    if(isloading == true){

      return (
        <View style={styles.Loadingcontainer}>
          <ActivityIndicator color="#03befc" size="large" />
        </View>
      );

    }   
  
 

  


 
  
    
   
  function handlePress(year){
  
      navigation.navigate("LecturerClassroom",{ Year : year , Level : level3});

  }


  
  const generateRandomBrightestHSLColor = () => {
      return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "85%,2)";
    };
  


  
    
  
  
if(role == "Lecturer"){
  return(
      <View style={styles.container}>
      
      <FlatList
          data={AcademyYear}
          
          renderItem={
              
             
              ({ item }) =>
               (
                 
            <View style = {styles.box}>
              <TouchableOpacity onPress={() => handlePress(item.year)}>
              <Text style={{alignSelf:'center',paddingTop:15,fontSize:15}}>{item.year}</Text>
              </TouchableOpacity>
            </View>
            )}
          keyExtractor={(item, index) => index.toString()}

        />
      

      
    </View>
  );
  

}

if(role == "Demo"){
  return(
      <View>
          <Text>demo</Text>
      </View>
  );

}

if(role == "Student"){
  
  return(
      <View>
          <FlatList
          data={subjects}
          
          renderItem={
              
             
              ({ item }) =>
               (
                 
            <View
              style={[
                styles.Box,{borderBottomColor:"black",borderBottomWidth:0.5}
               
              ]}
            >
              <TouchableOpacity onPress={() => CheckEntoll(item.CourseID,item.EntrollKey,item.course,item.CourseNameID,item.userId)}>
              <View style = {[styles.smallBox ,{backgroundColor:generateRandomBrightestHSLColor()}]}>
                  <Text><Entypo name="book" size={70} color="black" /></Text>
                  <Text style={{marginTop:'5%',fontSize:20,padding:5,}}>{item.course}</Text>
                  <Text style={{fontSize:10,}}>{item.CourseNameID}</Text>

              </View>
              </TouchableOpacity>
              <Text style={{color:'black' ,fontSize:8 ,alignSelf:'flex-end',paddingRight:20,paddingTop:15}}>{item.dateAndTime}</Text>
            </View>
            )}
          keyExtractor={(item, index) => index.toString()}

        />
      </View>
  );

}
  

  return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );

  
}



const styles = StyleSheet.create({
 
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
      alignItems: "center",
      backgroundColor: "white",
      flex: 1,
    },
    select: {
      marginTop: 20,
      marginBottom: 10,
      borderRadius: 20,
      alignItems: "center",
      height: 60,
      width: "70%",
      shadowColor: "#000",
      backgroundColor: "#34dbeb",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      elevation: 8,
    },
    Box :{
      width:'100%',
      marginTop:'2%',
      borderRadius:15,
     paddingBottom:10,

      
      backgroundColor:"white"
    },
    smallBox:{
      width:'100%',
      alignItems:'center',
      borderRadius:15,
      padding:50,
      marginTop:0
     

    },
    box :{
      
      
      width:300,
      height:50,
      backgroundColor:'#34dbeb',
      marginTop:'5%',
      borderRadius:30

    }
  
  });
  
  
  
import React, { useState,useEffect } from "react";
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
  BackHandler,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";
import HyperlinkedText from "react-native-hyperlinked-text";
import {
  useFocusEffect
 } from '@react-navigation/native';



export default function CourseScreen({ navigation,route }) {
  const[role, setRole] = useState('');
  const [subjects, setSubjects] = useState([]); 
  const [subjects1, setSubjects1] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const currentUser = firebase.auth().currentUser;


  const { Faculty } = route.params;
  const { Department } = route.params;
  const { Level } = route.params;
  const { CourseID } = route.params;
  const { CourseName } = route.params;
  const { CoursenameID } = route.params;
  const { Year } = route.params;
  const { UserID } = route.params;
  
  console.log(Faculty);
  console.log(Department);
  console.log(Level);
  console.log(CourseID);
  console.log(CourseName);
  console.log(CoursenameID);
  console.log(Year);
  console.log("ar");

  useFocusEffect(
    React.useCallback(() => {    
      const onBackPress = () => {
        navigation.navigate('ClassroomWelcome');

        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };
 
      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
 
      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

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
       
      
       
        console.log("fsd");
        
        
       
        
        
        
      }
    }

    getUserInfo();
 
 
     },[])


     useEffect(() =>{

       
      async function fetchSubjects() {
      
        const data = [];
        const db = firebase.firestore();
        const querySnapshot = await db.collection("Courses-"+Faculty)
        .doc(Department)
        .collection(Level)
        .doc(Year)
        .collection(CourseID)
        .doc(CourseID)
        .collection(currentUser.uid)
        .orderBy("created").get();
      
        querySnapshot.forEach((doc) => {
           
    
          
          data.push(doc.data());
         
         
        });
       
        setSubjects(data);
        setisLoading(false);
       
      }
     
     
        fetchSubjects();
        setisLoading(false);
      
       
      
       },[])

       useEffect(() =>{

       
        async function fetchSubjects1() {
        
          const data = [];
          const db = firebase.firestore();
          const querySnapshot = await db.collection("Courses-"+Faculty)
          .doc(Department)
          .collection(Level)
          .doc(Year)
          .collection(CourseID)
          .doc(CourseID)
          .collection(UserID)
          .orderBy("created").get();
        
          querySnapshot.forEach((doc) => {
             
      
            
            data.push(doc.data());
           
           
          });
         
          setSubjects1(data);
          setisLoading(false);
         
        }
       
       
          fetchSubjects1();
          setisLoading(false);
        
         
        
         },[])
  

     const handlePress = () =>{
      navigation.navigate("CourseContent",{Faculty : Faculty,Department :Department,Level : Level,CourseID : CourseID,CourseName : CourseName ,CoursenameID:CoursenameID,Year : Year});
     }

     
if(isloading == "true"){
  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
  );

}
 
  
if(role == "Lecturer"){
  return(
    <View style={styles.container}>
      <View style ={{alignSelf:'center',marginBottom :'10%'}}>
        <Text style = {{fontSize:25}}>{CourseName}</Text>
        <Text style = {{alignSelf:'center'}}>- {CoursenameID} -</Text>
      </View>
      <ScrollView style={styles.scrollScreen}>
        <View>
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.Box,
                ]}
              >
                <Text  style={{paddingBottom:10 ,fontSize:15}}>{item.title}</Text>
                <Text style={{paddingLeft:10 ,paddingBottom:10}}>{item.instruction}</Text>
                <Text style={{paddingLeft:10 ,fontSize:10}}>Document Link</Text>
               <Text style = {{paddingLeft:10 ,fontSize:10,color:'red'}}>{item.document}</Text>
               
              
             
             
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>

      <View style={styles.AddIcon}>
        <Ionicons
          name="md-add-circle-sharp"
          size={70}
          color="#03dffc"
          onPress={handlePress}
        />
      </View>
    </View>
  );


}
if(role == "Student"){
  return(
    <View style={styles.container}>
    <View style ={{alignSelf:'center',marginBottom :'10%'}}>
      <Text style = {{fontSize:25}}>{CourseName}</Text>
      <Text style = {{alignSelf:'center'}}>- {CoursenameID} -</Text>
    </View>
    <ScrollView style={styles.scrollScreen}>
      <View>
        <FlatList
          data={subjects1}
          renderItem={({ item }) => (
            <View
              style={[
                styles.Box,
              ]}
            >
              <Text  style={{paddingBottom:10 ,fontSize:15}}>{item.title}</Text>
              <Text style={{paddingLeft:10 ,paddingBottom:10}}>{item.instruction}</Text>
              <Text style={{paddingLeft:10 ,fontSize:10}}>Document Link</Text>
             <Text style = {{paddingLeft:10 ,fontSize:10,color:'red'}}>{item.document}</Text>
             
            
           
           
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>

   
  </View>
  );

}

if(role == "Demo"){
  <View style={styles.container}>
  <View style ={{alignSelf:'center',marginBottom :'10%'}}>
    <Text style = {{fontSize:25}}>{CourseName}</Text>
    <Text style = {{alignSelf:'center'}}>- {CoursenameID} -</Text>
  </View>
  <ScrollView style={styles.scrollScreen}>
    <View>
      <FlatList
        data={subjects1}
        renderItem={({ item }) => (
          <View
            style={[
              styles.Box,
            ]}
          >
            <Text  style={{paddingBottom:10 ,fontSize:15}}>{item.title}</Text>
            <Text style={{paddingLeft:10 ,paddingBottom:10}}>{item.instruction}</Text>
            <Text style={{paddingLeft:10 ,fontSize:10}}>Document Link</Text>
           <Text style = {{paddingLeft:10 ,fontSize:10,color:'red'}}>{item.document}</Text>
           
          
         
         
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  </ScrollView>

 
</View>
  
}
return (
  <View style={styles.Loadingcontainer}>
    <ActivityIndicator color="#03befc" size="large" />
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
  AddIcon: {
    position: "absolute",
    bottom: "25%",
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  scrollScreen: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.001,
  },
  homeContent: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: "2%",
    backgroundColor: "#f2ffff",
    height: 120,
    width: 290,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 8,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  Box: {
    width: "100%",
    paddingRight:10,
    paddingLeft:10,
    borderBottomWidth:1,
    borderColor:"#38deff",
    borderRadius: 30,
    paddingBottom: 10,
    marginBottom:'8%',

    backgroundColor: "white",
  },
  smallBox: {
    width: "100%",
    alignItems: "center",
    borderRadius: 15,
    padding: 50,
    marginTop: 0,
  },
});

import React, { useState,useEffect } from "react";
import uuid from "react-native-uuid";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddResults } from "../../../API/firebaseMethods/firebaseMethod";
import RNPickerSelect from "react-native-picker-select";
import { StoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { StoreCourseName } from "../../../API/firebaseMethods/firebaseMethod";
import * as firebase from "firebase";
export default function AddCourse({ navigation,route }) {
  
   
    
    const { Year } = route.params; 
    const { Level } = route.params; 

    
    const [ID] = useState(uuid.v4());
    const [CourseID] = useState(uuid.v4());
    const[faculty, setFaculty] = useState('');
  const[groupStudent, setGroupstudent] = useState('');
  const [course, setCourse] = useState("");
  const [CourseNameID, setCourseNameID] = useState("");
  
 


 
  

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
          setFaculty(dataObj.faculty);

        }
      }

      getUserInfo();
     console.log(faculty);
     console.log(Year);

},[])


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const password = makeid(10);
    
      const handlePress = () => {

        if(!course){
            Alert.alert("course required");
        }else{
            console.log(course);
            
            StoreCourseName(
                currentUser.uid,
                faculty,
                groupStudent,
                Level,
                Year,
                course,
                CourseID,
                CourseNameID,
                password

            );
            setCourse('');
            navigation.navigate("CourseScreen",{Faculty : faculty,Department : groupStudent,Level :Level, Year : Year,CourseID : CourseID,CourseName:course,CoursenameID:CourseNameID});
        }
       
      };

     


     
    
  return (
    <View style={styles.container}>
        <View style = {{alignSelf :'center'}}>
            <Text style ={{fontSize :20}}>Add Course</Text>
        </View>
        <ScrollView>
        <View>
          
       

          

         
         
        

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>course name</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="course"
                value={course}
                onChangeText={(course) => setCourse(course)}
              />
            </View>
          </View>

          < View style={styles.cardCont}>
            <Text style={styles.cardtext}>CourseID</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="course"
                value={CourseNameID}
                onChangeText={(CourseNameID) => setCourseNameID(CourseNameID)}
              />
            </View>
          </View>

          


            <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{groupStudent ? ` ${groupStudent}` : "Select group"}</Text>
            </Text>
            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(groupStudent) => setGroupstudent(groupStudent)}
                items={[
                  { label: "Computer Science", value: "Computer Science" },
                  { label: "Physical Science", value: "Physical SCience" },
                  { label: "Bio SCience", value: "Bio SCience" },
                ]}
              />
            </View>
          </View>

          

            
          </View>

        </ScrollView>

        <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
            <Text style={styles.SignUpText}>Add</Text>
         </TouchableOpacity>
      
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
  datePickerStyle: {
    width: 200,
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 0.8,
  },

  cardCont: {
    marginTop: 10,
    marginLeft: 20,
    padding: 5,
    width: "80%",
  },
  text: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
  },

  cardtext: {
    marginLeft: 3,
    fontSize: 20,
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
    marginLeft: 10,
    color: "black",
    fontSize: 15,
  },

  buttonSignup: {
    backgroundColor: "#34dbeb",
    alignSelf: "center",
    height: 50,
    borderRadius: 9,
    marginTop: 80,
    marginBottom: 20,
    paddingTop: 3,
    width: "70%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },

  SignUpText: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },

  inlineText: {
    color: "blue",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },
});

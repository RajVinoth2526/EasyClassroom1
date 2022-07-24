import React, { useState,useEffect } from "react";
import uuid from "react-native-uuid";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddResults } from "../../../API/firebaseMethods/firebaseMethod";
import RNPickerSelect from "react-native-picker-select";
import { StoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { StoreCourseName } from "../../../API/firebaseMethods/firebaseMethod";
import * as firebase from "firebase";
import { StoreAcademyYear } from "../../../API/firebaseMethods/firebaseMethod";
export default function AddAcademyYear({ navigation }) {
  
   
    
    

    
const [ID] = useState(uuid.v4());
const [academyYear, setacademyYear] = useState("");
  
 


 
  

  const currentUser = firebase.auth().currentUser;


 





    
      const handlePress = () => {

        if(!academyYear){
            Alert.alert("course required");
        }else{
          
            
            StoreAcademyYear(ID,academyYear);
            setacademyYear('');
            navigation.goBack();
        }
       
      };

     


     
    
  return (
    <View style={styles.container}>
        <View style = {{alignSelf :'center'}}>
            <Text style ={{fontSize :20}}>Add AcademyYear</Text>
        </View>
        <ScrollView>
        <View>

          < View style={styles.cardCont}>
            <Text style={styles.cardtext}>academyYear</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="course"
                value={academyYear}
                onChangeText={(academyYear) => setacademyYear(academyYear)}
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

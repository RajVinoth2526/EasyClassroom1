import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddResults } from "../../../API/firebaseMethods/firebaseMethod";
import RNPickerSelect from "react-native-picker-select";
export default function AddResultsScreen({ navigation }) {
    const [year, setYear] = useState("");
    const [level, setLevel] = useState("");
    const [course, setCourse] = useState("");
    const [result, setResult] = useState("");
    const [credits, setCredits] = useState("");
    const [RegistrationNumber, setRegistrationNumber] = useState("");


    const emptyState = () => {
        setYear("");
        setCourse("");
        setResult("");
        setLevel("");
        setRegistrationNumber("");
       
      };
    
      const handlePress = () => {
        if (!year) {
          Alert.alert("year is required");
        }if (!RegistrationNumber) {
            Alert.alert("Resgitration number is required");
        }if (!level) {
            Alert.alert("level is required");
          }  else if (!course) {
          Alert.alert("course field is required.");
        } else if (!result) {
          Alert.alert(" result field is required.");
        } else if (!credits) {
          Alert.alert(" credits field is required.");
        } else {
          AddResults(
           year,
           level,
           RegistrationNumber,
           course,
           result,
           credits
          );
          Alert.alert(" Result Added successfully");
          emptyState();
        }
      };
    
  return (
    <View style={styles.container}>
        <View style = {{alignSelf :'center'}}>
            <Text style ={{fontSize :20}}>Add Results</Text>
        </View>
        <ScrollView>
        <View>
          
       

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{year ? ` year is ` : "Select Year"}</Text>
            </Text>

            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(year) => setYear(year)}
                items={[
                  { label: "2018|2019", value: "2018|2019" },
                  { label: "2019|2020", value: "2019|2020" },
                  { label: "2020|2021", value: "2020|2021" },
                  { label: "2021|2022", value: "2021|2022" },
                ]}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{level ? ` level is ` : "Select Level"}</Text>
            </Text>

            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(level) => setLevel(level)}
                items={[
                  { label: "Level1", value: "Level1" },
                  { label: "Level2", value: "Level2" },
                  { label: "Level3", value: "Level3" },
                  
                ]}
              />
            </View>
          </View>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>RegistrationNumber</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="CSXXXYY"
                value={RegistrationNumber}
                onChangeText={(RegistrationNumber) => setRegistrationNumber(RegistrationNumber)}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>course</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="course"
                value={course}
                onChangeText={(course) => setCourse(course)}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{result ? ` Result is ` : "Select Result"}</Text>
            </Text>
          <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(result) => setResult(result)}
                items={[
                  { label: "A+", value: "A+" },
                  { label: "A", value: "A" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B", value: "B" },
                  { label: "B-", value: "B-" },
                  { label: "C+", value: "C+" },
                  { label: "C", value: "C" },
                  { label: "C-", value: "C-" },
                  { label: "D+", value: "D+" },
                  { label: "D", value: "D" },
                  { label: "E", value: "E" },

                  
                ]}
              />
            </View>
            </View>

            <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{credits ? ` credits are ` : "Select credits"}</Text>
            </Text>

            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(credits) => setCredits(credits)}
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                  
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

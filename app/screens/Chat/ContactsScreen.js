import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";

export default function ContactScreen({ navigation }) {

    const role1 = "Lecturer";
    const role2 = "Demonstrator";
    const role4 = "Admin";

  

    function handlePress(Role){
   
        navigation.navigate("SelectContact", { ROLE: Role });

    }
  

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>
           Chat With
        </Text>
      </View>

      <View
        style={[
          styles.select,
         ,
        ]}
      >
        <TouchableOpacity onPress={() => handlePress(role1)}>
          <Text style={styles.selectText}>Lecturer</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.select,
          
        ]}
      >
        <TouchableOpacity onPress={() => handlePress(role2)}>
          <Text style={styles.selectText}>Demonstrator</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.select,
         
        ]}
      >
        <TouchableOpacity onPress={() => handlePress(role4)}>
          <Text style={styles.selectText}>Admin</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  head: {
    marginTop: "30%",
    marginBottom: "10%",
    alignSelf: "center",
  },
  headText: {
    fontSize: 40,
  },
  select: {
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 20,
    alignItems: "center",
    height: 60,
    width: "70%",
    borderColor:'#64bdf5',
    borderWidth:2,
    backgroundColor:'#76e2f5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  selectText: {
    alignSelf: "center",
    fontSize: 25,
    marginTop: "5%",
  },
  inlineText: {
    marginTop: 5,
    fontSize: 15,
    color: "blue",
  },
  selectSignIn: {
    marginTop: 40,
  },
});

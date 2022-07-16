import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function DemoRegistration(
  email,
  password,
  lastName,
  firstName,
  gender,
  district,
  faculty,
  department,
  id
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      id: id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      faculty: faculty,
      department: department,
      district: district,
      role: "Demonstrator",
    });
  
    const db1 = firebase.firestore();
    db1.collection("Demonstrator").doc(currentUser.uid).set({
     
      id: currentUser.uid,
      firstName: firstName,
      lastName: lastName,
      
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

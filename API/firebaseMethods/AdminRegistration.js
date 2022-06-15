import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";


export async function AdminRegistration(
    email,
    password,
    lastName,
    firstName,
    gender,
    district,
    faculty,
    department,
    id,
  
 ) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        id : id,
        firstName : firstName,
        lastName : lastName,
        gender : gender,
        district : district,
        faculty : faculty,
        department : department,
        role : 'Admin',
       

      });

      
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}



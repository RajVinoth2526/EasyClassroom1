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
  id,
  image
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

    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("profileImage/" + currentUser.uid);
    const snapshot = await ref.put(blob);

    const db1 = firebase.firestore();
    db1.collection("Demonstrator").doc(currentUser.uid).set({
      id: currentUser.uid,
      firstName: firstName,
      lastName: lastName,
      ProfileUrl: image,
    });

    return true;
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
    return false;
  }
}

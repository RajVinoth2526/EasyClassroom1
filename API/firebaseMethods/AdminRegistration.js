import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

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
  image
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const response = await fetch(image);
    const blob = await response.blob();

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      id: id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      district: district,
      faculty: faculty,
      department: department,
      role: "Admin",
    });

    var ref = firebase
      .storage()
      .ref()
      .child("profileImage/" + currentUser.uid);
    const snapshot = await ref.put(blob);

    const db1 = firebase.firestore();
    db1.collection("Admin").doc(currentUser.uid).set({
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

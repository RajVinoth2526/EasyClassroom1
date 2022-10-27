import * as firebase from "firebase";
import "firebase/firestore";
import {
  Alert,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

export async function StudentRegistration(
  email,
  password,
  lastName,
  firstName,
  registrationNumber,
  indexNumber,
  gender,
  district,
  course,
  faculty,
  image
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    let year = new Date().getFullYear();

    const academyYear = year - 1 + "|" + year;

    const db = firebase.firestore();

    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
      registrationNumber: registrationNumber,
      indexNumber: indexNumber,
      gender: gender,
      district: district,
      course: course,
      role: "Student",
      faculty: faculty,
      academyYear: academyYear,
    });

    const response = await fetch(image);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("profileImage/" + currentUser.uid);
    const snapshot = await ref.put(blob);

    const db1 = firebase.firestore();
    db1.collection("Student").doc(currentUser.uid).set({
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

export async function StoreSendMessage(
  id,
  type,
  message,
  SenderID,
  ReceiverID,
  firstName,
  lastName,
  ProfileUrl
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("messages")
      .doc(SenderID)
      .collection(ReceiverID)
      .doc(id)
      .set({
        MessageId: id,
        type: type,
        ReceiverID: ReceiverID,
        message: message,
        dateAndTime: dateAndTime,
        firstName: firstName,
        lastName: lastName,
        ProfileUrl: ProfileUrl,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function DeleteMessage(
  id,
  created,
  type,
  SenderID,
  ReceiverID,
  firstName,
  lastName,
  ProfileUrl
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("messages")
      .doc(SenderID)
      .collection(ReceiverID)
      .doc(id)
      .update({
        MessageId: id,
        type: type,
        ReceiverID: ReceiverID,
        message: "message has deleted!",
        dateAndTime: dateAndTime,
        firstName: firstName,
        lastName: lastName,
        ProfileUrl: ProfileUrl,
        created: created,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreCourse(
  id,
  userId,
  faculty,
  department,
  level,
  year,
  course,
  CourseID,
  CourseNameID,
  title,
  instruction,
  document
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("Courses-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection(CourseID)
      .doc(CourseID)
      .collection(userId)
      .doc(id)
      .set({
        Id: id,
        userId: userId,
        course: course,
        CourseNameID: CourseNameID,
        dateAndTime: dateAndTime,
        title: title,
        instruction: instruction,
        document: document,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function UpdateStoreCourse(
  id,
  userId,
  faculty,
  department,
  level,
  year,
  course,
  CourseID,
  CourseNameID,
  title,
  instruction,
  document
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("Courses-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection(CourseID)
      .doc(CourseID)
      .collection(userId)
      .doc(id)
      .update({
        Id: id,
        userId: userId,
        course: course,
        CourseNameID: CourseNameID,
        dateAndTime: dateAndTime,
        title: title,
        instruction: instruction,
        document: document,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function DeleteStoreCourse(
  id,
  userId,
  faculty,
  department,
  level,
  year,
  CourseID
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("Courses-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection(CourseID)
      .doc(CourseID)
      .collection(userId)
      .doc(id)
      .delete();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreCourseName(
  userId,
  faculty,
  department,
  level,
  year,
  course,
  CourseID,
  CourseNameID,
  password
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("CoursesName-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection("CourseNames")
      .doc(CourseID)
      .set({
        userId: userId,
        CourseID: CourseID,
        CourseNameID: CourseNameID,
        course: course,
        dateAndTime: dateAndTime,
        EntrollKey: password,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function DeleteStoreCourseName(
  faculty,
  department,
  level,
  year,
  CourseID
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("CoursesName-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection("CourseNames")
      .doc(CourseID)
      .delete();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function EditCourseName(
  userId,
  faculty,
  department,
  level,
  year,
  course,
  CourseID,
  CourseNameID,
  password
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("CoursesName-" + faculty)
      .doc(department)
      .collection(level)
      .doc(year)
      .collection("CourseNames")
      .doc(CourseID)
      .update({
        userId: userId,
        CourseID: CourseID,
        CourseNameID: CourseNameID,
        course: course,
        dateAndTime: dateAndTime,
        EntrollKey: password,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreAcademyYear(id, Year) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1.collection("AcademyYearForStudents").doc(id).set({
      Id: id,
      year: Year,
      dateAndTime: dateAndTime,

      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreReceiveMessage(
  id,
  message,
  ReceiverID,
  SenderID,
  firstName,
  lastName,
  ProfileUrl
) {
  try {
    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    const db1 = firebase.firestore();
    db1
      .collection("messages")
      .doc(ReceiverID)
      .collection(SenderID)
      .doc(id)
      .set({
        MessageId: id,
        ReceiverID: ReceiverID,
        message: message,
        dateAndTime: dateAndTime,
        firstName: firstName,
        lastName: lastName,
        ProfileUrl: ProfileUrl,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreReceivedID(
  ReceiverID,
  ID,
  firstName,
  lastName,
  ProfileUrl
) {
  const db1 = firebase.firestore();
  db1
    .collection("Conversations")
    .doc(ReceiverID)
    .collection("Chats")
    .doc(ID)
    .set({
      ID: ID,
      firstName: firstName,
      lastName: lastName,
      ProfileUrl: ProfileUrl,
    });
}

export async function DeleteChat(ReceiverID, ID) {
  try {
    const db = firebase.firestore();
    db.collection("Conversations")
      .doc(ReceiverID)
      .collection("Chats")
      .doc(ID)
      .delete();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StudentEntroll(userID, CourseID) {
  try {
    const db1 = firebase.firestore();
    db1
      .collection("entrollment")
      .doc(userID)
      .collection("course")
      .doc(CourseID)
      .set({
        userID: userID,
        CourseID: CourseID,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function StoreCourseLink(id, url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("CourseLink/" + id);
    const snapshot = await ref.put(blob);
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function UpdateUserDetails(id, firstName, lastName, role) {
  const currentUser = firebase.auth().currentUser;

  const image = await firebase
    .storage()
    .ref()
    .child("profileImage/" + currentUser.uid) //name in storage in firebase console
    .getDownloadURL();

  console.log(image + "nothing");

  const db1 = firebase.firestore();
  db1.collection(role).doc(id).update({
    id: id,
    firstName: firstName,
    lastName: lastName,
    ProfileUrl: image,
  });
}
export async function AddResults(
  year,
  level,
  RegistrationNumber,
  course,
  result,
  credits,
  faculty,
  department
) {
  try {
    const db = firebase.firestore();
    db.collection(faculty + "-result")
      .doc(department)
      .collection(year)
      .doc(level)
      .collection(RegistrationNumber)
      .doc(course)
      .set({
        course: course,
        result: result,
        credits: credits,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function UploadPost(
  id,
  message,
  title,
  imageUrl,
  ProfileUrl,
  faculty
) {
  try {
    const currentUser = firebase.auth().currentUser;

    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    let dataObj = doc.data();

    const db = firebase.firestore();
    db.collection(faculty + "-Posts")
      .doc(id)
      .set({
        Postid: id,
        UserId: currentUser.uid,
        title: title,
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        message: message,
        DateTime: dateAndTime,
        imageUrl: imageUrl,
        ProfileUrl: ProfileUrl,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function EditPost(id, message, title, image, faculty) {
  try {
    const currentUser = firebase.auth().currentUser;

    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    let dataObj = doc.data();

    const db = firebase.firestore();
    db.collection(faculty + "-Posts")
      .doc(id)
      .update({
        Postid: id,
        UserId: currentUser.uid,
        title: title,
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        message: message,
        DateTime: dateAndTime,
        imageUrl: image,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function DeletePost(id, faculty) {
  try {
    const db = firebase.firestore();
    db.collection(faculty + "-Posts")
      .doc(id)
      .delete();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function CreateNotice(
  id,
  notice,
  title,
  type,
  ProfileUrl,
  faculty
) {
  try {
    const currentUser = firebase.auth().currentUser;

    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    let dataObj = doc.data();

    const db = firebase.firestore();
    db.collection(faculty + "Notices")
      .doc(id)
      .set({
        id: id,
        UserID: currentUser.uid,
        notice: notice,
        title: title,
        type: type,
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        DateTime: dateAndTime,
        ProfileUrl: ProfileUrl,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function EditNotice(Noticeid, notice, title, type, Faculty) {
  try {
    const currentUser = firebase.auth().currentUser;

    var dateAndTime = moment().format("DD/MM/YYYY HH:mm");

    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    let dataObj = doc.data();

    const db = firebase.firestore();
    db.collection(Faculty + "Notices")
      .doc(Noticeid)
      .update({
        id: Noticeid,
        UserID: currentUser.uid,
        title: title,
        type: type,
        firstName: dataObj.firstName,
        lastName: dataObj.lastName,
        notice: notice,
        DateTime: dateAndTime,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function DeleteNotice(id, Faculty) {
  try {
    const db = firebase.firestore();
    db.collection(Faculty + "Notices")
      .doc(id)
      .delete();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function UploadImage(uri, imageName) {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("profileImage/" + imageName);
  const snapshot = await ref.put(blob);
}

export async function UploadPostImage(uri, imageName) {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("PostImage/" + imageName);
  const snapshot = await ref.put(blob);
}
export async function UploadTimeTable(uri, imageName) {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("TimeTablePhoto/" + imageName);
  const snapshot = await ref.put(blob);
}

export async function GetImage(userId) {
  let url = await firebase
    .storage()
    .ref("images/" + userId)
    .child()
    .getDownloadURL();

  return url;
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    return false;
  }
}
export async function UpdateStudent(
  updateFirstName,
  updateLastName,
  updateGender,
  updateIndexNumber,
  updateRegistrationNumber,
  updateFaculty,
  updateCourse,
  updateDistrict
) {
  try {
    const currentUser = firebase.auth().currentUser;

    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        firstName: updateFirstName,
        lastName: updateLastName,
        gender: updateGender,
        indexNumber: updateIndexNumber,
        registrationNumber: updateRegistrationNumber,
        faculty: updateFaculty,
        course: updateCourse,
        district: updateDistrict,
      })
      .then(() => {
        console.log("User updated!");
      });
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function Update(
  id,
  updateFirstName,
  updateLastName,
  updateGender,
  updateFaculty,
  updateDepartment,
  updateDistrict
) {
  try {
    const currentUser = firebase.auth().currentUser;

    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    let dataObj = doc.data();

    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        id: id,
        email: dataObj.email,
        role: dataObj.role,
        firstName: updateFirstName,
        lastName: updateLastName,
        gender: updateGender,
        faculty: updateFaculty,
        department: updateDepartment,
        district: updateDistrict,
      })
      .then(() => {
        console.log("User updated!");
      });
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

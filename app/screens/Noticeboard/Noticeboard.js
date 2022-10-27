import React, { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as firebase from "firebase";

export default function NoticeboardScreen({ navigation }) {
  const [faculty, setFaculty] = useState("");

  let currentUserUID = firebase.auth().currentUser.uid;

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setFaculty(dataObj.faculty);
      }
    }
    getUserInfo();
  }, []);

  const handler1 = () => {
    navigation.navigate("UniversityNoticeboard", { Faculty: faculty });
  };

  const handler2 = () => {
    navigation.navigate("FacultyNoticeboard", { Faculty: faculty });
  };

  const handler3 = () => {
    navigation.navigate("DepartmentNoticeboard", { Faculty: faculty });
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("15%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("15%"),
            borderBottomRightRadius: 60,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: hp("4%"),
              fontWeight: "bold",
            }}
          >
            Noticeboard
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("15%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("15%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>

      <TouchableOpacity style={[styles.select]} onPress={handler1}>
        <Text style={styles.homeContentText}>
          <MaterialCommunityIcons
            name="text-box-multiple"
            size={hp("4%")}
            color="black"
          />{" "}
          University
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.select]} onPress={handler2}>
        <Text style={styles.homeContentText}>
          <MaterialCommunityIcons
            name="text-box-multiple"
            size={hp("4%")}
            color="black"
          />{" "}
          Faculty
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.select]} onPress={handler3}>
        <Text style={styles.homeContentText}>
          <MaterialCommunityIcons
            name="text-box-multiple"
            size={hp("4%")}
            color="black"
          />{" "}
          Department
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  select: {
    marginTop: hp("1.5%"),
    borderRadius: 20,
    alignItems: "center",
    height: hp("15%"),
    width: wp("75%"),
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#c986f0",
    borderWidth: 2,
    backgroundColor: "#e6c0fc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  homeContentText: {
    alignSelf: "center",
    fontSize: hp("4%"),
    fontWeight: "400",
  },
  head: {
    alignSelf: "center",
    marginTop: hp("15%"),
    marginBottom: hp("6%"),
    alignSelf: "center",
  },
  headText: {
    fontSize: hp("4.5%"),
    marginTop: -40,
    marginLeft: 10,
  },
});

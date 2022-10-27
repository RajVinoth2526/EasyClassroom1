import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddResults } from "../../../API/firebaseMethods/firebaseMethod";
import RNPickerSelect from "react-native-picker-select";
import * as firebase from "firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function AddResultsScreen({ navigation }) {
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [result, setResult] = useState("");
  const [credits, setCredits] = useState("");
  const [RegistrationNumber, setRegistrationNumber] = useState("");

  const currentUser = firebase.auth().currentUser;

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
      setDepartment(dataObj.department);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const emptyState = () => {
    setYear("");
    setCourse("");
    setResult("");
    setLevel("");
    setRegistrationNumber("");
  };
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = () => {
    if (!year) {
      Alert.alert("year is required");
    }
    if (!RegistrationNumber) {
      Alert.alert("Resgitration number is required");
    }
    if (!level) {
      Alert.alert("level is required");
    } else if (!course) {
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
        credits,
        faculty,
        department
      );
      Alert.alert(" Result Added successfully");
      emptyState();
    }
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("10%"),
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
            Add Results
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("10%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("55%"), marginTop: hp("2%") }}>
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
                  onChangeText={(RegistrationNumber) =>
                    setRegistrationNumber(RegistrationNumber)
                  }
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
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  datePickerStyle: {
    width: 200,
  },
  scrollView: {
    height: hp("55%"),
    width: wp("90%"),
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: hp("5%"),
    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginTop: hp("1%"),
    alignSelf: "center",
    width: wp("78%"),
  },
  text: {
    alignSelf: "center",
    marginTop: hp("4%"),
    fontSize: 30,
    fontWeight: "bold",
  },

  cardtext: {
    marginLeft: wp("1%"),
    fontSize: hp("2.4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  action: {
    justifyContent: "center",
    borderRadius: 10,
    height: hp("6%"),
    marginBottom: hp("1%"),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  textinput: {
    marginLeft: wp("3%"),
    color: "black",
    fontSize: hp("2.2%"),
  },

  buttonSignup: {
    backgroundColor: "#cdaffa",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("8%"),
    borderRadius: 9,
    marginTop: hp("8%"),
    marginBottom: hp("0.1%"),
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  SignUpText: {
    fontSize: hp("3%"),
    alignSelf: "center",
    fontWeight: "bold",
  },

  inlineText: {
    color: "red",
    marginTop: hp("1.5%"),
    marginBottom: hp("4%"),
    alignSelf: "center",
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },

  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

import React, { useState, useEffect } from "react";
import uuid from "react-native-uuid";
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
import { StoreCourse } from "../../../API/firebaseMethods/firebaseMethod";
import { StoreCourseName } from "../../../API/firebaseMethods/firebaseMethod";
import * as firebase from "firebase";
import { StoreAcademyYear } from "../../../API/firebaseMethods/firebaseMethod";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function AddAcademyYear({ navigation }) {
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const [ID] = useState(uuid.v4());
  const [academyYear, setacademyYear] = useState("");

  const currentUser = firebase.auth().currentUser;

  const handlePress = () => {
    if (!academyYear) {
      Alert.alert("course required");
    } else {
      StoreAcademyYear(ID, academyYear);
      setacademyYear("");
      navigation.goBack();
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
              fontSize: hp("3%"),
              fontWeight: "bold",
            }}
          >
            Create AcademyYear
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
        <ScrollView style={{ height: hp("30%"), marginTop: hp("10%") }}>
          <View>
            <View style={styles.cardCont}>
              <Text style={styles.cardtext}>AcademyYear</Text>
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
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Create</Text>
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
    marginBottom: hp("3%"),
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

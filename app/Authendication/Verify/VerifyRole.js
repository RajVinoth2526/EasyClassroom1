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
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function VerifyRole({ navigation }) {
  const role1 = "Lecturer";
  const role2 = "Demonstrator";
  const role3 = "Student";
  const role4 = "Admin";

  const Verify = () => {
    navigation.navigate("Pin");
  };

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.head}>
          <Text style={styles.headText}>Who You Are ?</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: hp("85%"),
          width: wp("100%"),
          borderTopLeftRadius: 60,
        }}
      >
        <View style={{ alignSelf: "center", marginTop: hp("13%") }}>
          <TouchableOpacity onPress={Verify} style={styles.select}>
            <Text style={styles.selectText}>Lecturer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Verify} style={styles.select}>
            <Text style={styles.selectText}>Demostrator</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Verify} style={styles.select}>
            <Text style={styles.selectText}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Verify} style={styles.select}>
            <Text style={styles.selectText}>Admin</Text>
          </TouchableOpacity>

          <View style={styles.selectSignIn}>
            <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
              <Text style={styles.inlineText}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#cdaffa",
    flex: 1,
  },
  head: {
    borderBottomRightRadius: 60,
    height: hp("15%"),
    width: wp("100%"),
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#cdaffa",
  },
  headText: {
    fontSize: hp("4.5%"),
    alignSelf: "center",
    fontWeight: "bold",
  },
  select: {
    marginTop: hp("2%"),
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    height: hp("9%"),
    width: wp("70%"),
    shadowColor: "#000",
    backgroundColor: "#cdaffa",
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
    fontSize: hp("3.5"),
    fontWeight: "600",
  },
  inlineText: {
    fontSize: hp("2%"),
    alignSelf: "center",
    color: "red",
    fontWeight: "bold",
  },
  selectSignIn: {
    marginTop: hp("8%"),
  },
});

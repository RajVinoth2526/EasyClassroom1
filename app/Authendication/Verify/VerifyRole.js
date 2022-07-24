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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>Who You Are ?</Text>
      </View>

      <View style={styles.select}>
        <TouchableOpacity onPress={Verify}>
          <Text style={styles.selectText}>Lecturer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.select}>
        <TouchableOpacity onPress={Verify}>
          <Text style={styles.selectText}>Demostrator</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.select}>
        <TouchableOpacity onPress={Verify}>
          <Text style={styles.selectText}>Student</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.select}>
        <TouchableOpacity onPress={Verify}>
          <Text style={styles.selectText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectSignIn}>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.inlineText}>Already have an account?</Text>
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
    marginTop: hp("14%"),
    marginBottom: hp("6%"),
    justifyContent: "center",
    alignSelf: "center",
  },
  headText: {
    fontSize: hp("5%"),
    fontWeight:'bold'
  },
  select: {
    marginTop: hp("2%"),
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    height: hp("9%"),
    width: wp("70%"),
    shadowColor: "#000",
    backgroundColor: "#34dbeb",
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
    fontWeight:'bold'
  },
  inlineText: {
    fontSize: hp("2%"),
    color: "red",
    fontWeight:'bold'
  },
  selectSignIn: {
    marginTop: hp("8%"),
  },
});

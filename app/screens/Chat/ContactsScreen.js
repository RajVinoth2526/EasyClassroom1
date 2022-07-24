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
import { Entypo } from "@expo/vector-icons";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ContactScreen({ navigation }) {
  const role1 = "Lecturer";
  const role2 = "Demonstrator";
  const role3 = "Student";
  const role4 = "Admin";

  function handlePress(Role) {
    navigation.navigate("SelectContact", { ROLE: Role });
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>Chat With</Text>
      </View>

      <View style={[styles.select, ,]}>
        <TouchableOpacity onPress={() => handlePress(role1)}>
          <Text style={styles.selectText}>Lecturer</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.select]}>
        <TouchableOpacity onPress={() => handlePress(role2)}>
          <Text style={styles.selectText}>Demonstrator</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.select]}>
        <TouchableOpacity onPress={() => handlePress(role3)}>
          <Text style={styles.selectText}>Student</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.select]}>
        <TouchableOpacity onPress={() => handlePress(role4)}>
          <Text style={styles.selectText}>Admin</Text>
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
    marginTop: hp("15%"),
    marginBottom: hp("3%"),
    alignSelf: "center",
  },
  headText: {
    fontSize: hp("5.5%"),
    fontWeight: "bold",
  },
  select: {
    marginTop: hp("3%"),
    borderRadius: 20,
    alignItems: "center",
    height: hp("10%"),
    width: wp("75%"),
    justifyContent: "center",
    borderColor: "#64bdf5",
    borderWidth: 2,
    backgroundColor: "#76e2f5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  selectText: {
    alignSelf: "center",
    fontSize: hp("3.5%"),
    fontWeight: "550",
  },
  inlineText: {
    marginTop: 5,
    fontSize: 15,
    color: "blue",
  },
  selectSignIn: {
    marginTop: 40,
  },
});

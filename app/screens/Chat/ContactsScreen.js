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

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  function handlePress(Role) {
    navigation.navigate("SelectContact", { ROLE: Role });
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.head}>
          <Text style={styles.headText}>Chat With</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: wp("100%"),
          height: hp("80%"),
          borderTopLeftRadius: 60,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            style={[styles.select]}
            onPress={() => handlePress(role1)}
          >
            <Text style={styles.selectText}>Lecturer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.select]}
            onPress={() => handlePress(role2)}
          >
            <Text style={styles.selectText}>Demonstrator</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.select]}
            onPress={() => handlePress(role3)}
          >
            <Text style={styles.selectText}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.select]}
            onPress={() => handlePress(role4)}
          >
            <Text style={styles.selectText}>Admin</Text>
          </TouchableOpacity>
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
    width: wp("100%"),
    justifyContent: "center",
    height: hp("20%"),
    backgroundColor: "#cdaffa",
    borderBottomRightRadius: 60,
    alignSelf: "center",
  },
  headText: {
    fontSize: hp("5.5%"),
    alignSelf: "center",
    fontWeight: "bold",
  },
  select: {
    marginBottom: hp("2%"),
    borderRadius: 20,
    alignItems: "center",
    height: hp("10%"),
    width: wp("75%"),
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

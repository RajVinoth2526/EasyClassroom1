import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  BackHandler,
  StatusBar,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import * as firebase from "firebase";
import "firebase/firestore";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function forgotPassword(email) {
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert("Please check your email address Inbox  " + email);
      })
      .catch(function (e) {
        console.log(e);
        alert("please enter valid email address");
      });
  }

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = () => {
    if (!email) {
      Alert.alert("email field is required.");
    } else {
      forgotPassword(email);
      setEmail("");
      setPassword("");
    }
  };

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("12%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("12%"),
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
            Reset Password
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("12%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("12%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>

      <View style={{ alignSelf: "center", marginBottom: hp("5%") }}>
        <FontAwesome5 name="user-lock" size={hp("11%")} color="#cdaffa" />
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("25%") }}>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Email</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                style={styles.textinput}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#ffffff",
  },

  cardCont: {
    justifyContent: "center",
    alignSelf: "center",

    marginLeft: hp("0.5%"),
    width: wp("80%"),
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
  },

  cardtext: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  action: {
    marginTop: hp("2%"),
    height: hp("7%"),
    borderRadius: 12,

    marginBottom: hp("3%"),

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  textinput: {
    color: "black",
    height: hp("6%"),
    fontSize: hp("2.5%"),
    paddingLeft: 8,
  },

  buttonLogin: {
    backgroundColor: "#cdaffa",
    alignSelf: "center",

    height: hp("7%"),
    justifyContent: "center",
    borderRadius: 9,
    width: wp("60%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 8,
    elevation: 7,
  },

  buttontext: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    alignSelf: "center",
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 200,
    height: 200,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

import React from "react";
import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LoadingScreen({ navigation }) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Home");
    }
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/ec.png")}></Image>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: hp("2%"),
        }}
      >
        Easy Classroom
      </Text>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    alignSelf: "center",
    width: wp("40%"),
    height: hp("20%"),
  },
});

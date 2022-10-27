import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function SettingScreen({ navigation }) {
  const handlePress1 = () => {
    navigation.navigate("ChangePassword");
  };

  const handlePress2 = () => {
    navigation.navigate("ForgotPassword");
  };
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
        ></View>
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
      <View style={styles.head}>
        <Text>
          <Ionicons name="ios-settings" size={hp("9%")} color="#cdaffa" />
        </Text>
      </View>

      <TouchableOpacity style={styles.Box} onPress={handlePress1}>
        <Text style={{ alignSelf: "center", fontSize: hp("2.5%") }}>
          Change password
        </Text>
      </TouchableOpacity>

      <View style={styles.Box}>
        <TouchableOpacity onPress={handlePress2}>
          <Text style={{ alignSelf: "center", fontSize: hp("2.5%") }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Box: {
    alignSelf: "center",
    justifyContent: "center",
    height: hp("10%"),
    width: wp("60%"),
    borderRadius: 15,
    backgroundColor: "#e6c0fc",
    marginTop: hp("3%"),
  },
  head: {
    alignSelf: "center",
    marginBottom: hp("3%"),
  },
});

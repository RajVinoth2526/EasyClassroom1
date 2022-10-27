import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  BackHandler,
} from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function WelcomeScreen({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );
  React.useEffect(() => {
    StatusBar.setBackgroundColor("white");
    StatusBar.setTranslucent(true);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/ec.png")}
        ></Image>
        <Text
          style={{ alignSelf: "center", color: "#cdaffa", fontWeight: "bold" }}
        >
          Easy Classroom
        </Text>
        <Text style={styles.text}> TIME TO LEARN </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          title="Login"
          onPress={() => navigation.navigate("Sign In")}
        >
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#b5b4b1" }]}
          title="create class"
          onPress={() => navigation.navigate("VerifyRole")}
        >
          <Text style={styles.buttonText}>SignUp </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#cdaffa",
    marginBottom: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    height: hp("8%"),
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  logo: {
    width: wp("60%"),
    height: hp("20%"),
  },

  logoContainer: {
    marginTop: hp("20%"),
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontSize: hp("3%"),
    fontWeight: "bold",
  },

  text: {
    fontWeight: "bold",
    color: "black",
    marginTop: hp("1%"),
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },

  buttonContainer: {
    marginTop: hp("30%"),
    width: wp("70%"),
  },
});

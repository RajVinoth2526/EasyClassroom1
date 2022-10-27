import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import * as firebase from "firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function Pin({ navigation }) {
  const [pin, setPin] = useState("");
  const [lectuerPin, setLecturerPin] = useState("");
  const [demoPin, setDemoPin] = useState("");
  const [studentPin, setStudentPin] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [flag, setFlag] = useState("");

  React.useEffect(() => {
    StatusBar.setBackgroundColor("white");
    StatusBar.setTranslucent(true);
  }, []);

  const emptyState = () => {
    setPin("");
  };

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("PinForRole")
        .doc("Pins")
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setLecturerPin(dataObj.LecturerPin);
        setDemoPin(dataObj.DemoPin);
        setStudentPin(dataObj.StudentPin);
        setAdminPin(dataObj.AdminPin);
        setFlag(dataObj.flag);
      }
    }
    getUserInfo();
  });

  const handlePin = () => {
    if (pin == lectuerPin && lectuerPin != null) {
      navigation.navigate("LecturerSignUp");
      emptyState();
    } else if (pin == demoPin && demoPin != null) {
      navigation.navigate("DemoSignUp");
      emptyState();
    } else if (pin == studentPin && studentPin != null) {
      navigation.navigate("StudentSignUp");
      emptyState();
    } else if (pin == adminPin && adminPin != null) {
      navigation.navigate("AdminSignUp");
      emptyState();
    } else {
      Alert.alert("Incorrect Pin");
      emptyState();
    }
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  if (flag == "true") {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/ec.png")}
          ></Image>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={styles.head}>
            <Text style={styles.headText}>Enter PIN</Text>
          </View>
          <View style={styles.pinEntry}>
            <SmoothPinCodeInput
              placeholder={
                <View
                  style={{
                    width: wp("6%"),
                    height: hp("3%"),

                    marginTop: hp("1%"),
                    marginBottom: hp("5%"),
                    borderRadius: 10,
                    opacity: 0.5,
                    backgroundColor: "#edaffa",
                  }}
                ></View>
              }
              mask={
                <View
                  style={{
                    width: wp("6%"),
                    height: hp("3%"),
                    borderRadius: 25,
                    backgroundColor: "#cdaffa",
                  }}
                ></View>
              }
              cellSize={40}
              keyboardType={"default"}
              cellSpacing={0.001}
              codeLength={6}
              maskDelay={200}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              value={pin}
              onTextChange={(pin) => setPin(pin)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.enterButton}>
          <TouchableOpacity onPress={handlePin}>
            <Text style={styles.enterText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#03befc" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  head: {
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    alignItems: "center",
  },
  headText: {
    alignSelf: "center",
    fontSize: hp("6%"),
    fontWeight: "bold",
  },
  pinEntry: {
    marginTop: hp("3%"),
    marginBottom: hp("3%"),
  },
  enterButton: {
    justifyContent: "center",
    marginTop: hp("8%"),
    width: wp("50%"),
    height: hp("10%"),
    borderRadius: 20,
    marginBottom: hp("5%"),
    alignSelf: "center",
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

  enterText: {
    alignSelf: "center",
    fontSize: hp("4%"),
    fontWeight: "bold",
  },
  logo: {
    width: wp("55%"),
    height: hp("27%"),
  },
  logoContainer: {
    marginTop: hp("3%"),
    marginBottom: hp("5%"),
    alignItems: "center",
  },
  text: {
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

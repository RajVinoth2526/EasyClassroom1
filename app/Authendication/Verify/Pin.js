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
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CodeInput from "react-native-confirmation-code-input";
import { StoreRole } from "../../../API/firebaseMethods/firebaseMethod";
import "firebase/firestore";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import * as firebase from "firebase";

export default function Pin({ navigation }) {
  const [pin, setPin] = useState("");
  const [lectuerPin, setLecturerPin] = useState("");
  const [demoPin, setDemoPin] = useState("");
  const [studentPin, setStudentPin] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [flag, setFlag] = useState("");

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

  if(flag == "true"){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
        ></Image>
        <Text style={styles.text}>TIME TO LEARN</Text>
      </View>
      <ScrollView style={{ height: 100 }}>
        <View style={styles.head}>
          <Text style={styles.headText}>Enter PIN</Text>
        </View>
        <View style={styles.pinEntry}>
          <SmoothPinCodeInput
            placeholder={
              <View
                style={{
                  width: 15,
                  height: 15,

                  marginTop: "50%",
                  marginBottom: "120%",
                  borderRadius: 10,
                  opacity: 0.5,
                  backgroundColor: "#7ecbf7",
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  backgroundColor: "#0378ff",
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
      </ScrollView>
      <View style={styles.enterButton}>
        <TouchableOpacity onPress={handlePin}>
          <Text style={styles.enterText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

return(
  <View style={styles.Loadingcontainer}>
  <ActivityIndicator color="#03befc" size="large" />
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  head: {
    marginTop: "10%",
    marginBottom: "10%",
    alignItems: "center",
  },
  headText: {
    alignSelf: "center",
    fontSize: 40,
  },
  pinEntry: {
    marginTop: "10%",
    marginBottom: "20%",
  },
  enterButton: {
    backgroundColor: "#7ecbf7",

    width: 150,
    height: 50,
    borderRadius: 20,
    marginBottom: "10%",
    alignSelf: "center",
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

  enterText: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 25,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    top: 20,
    marginBottom: 70,
    alignItems: "center",
    padding: 10,
  },
  text: {
    marginTop: -20,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

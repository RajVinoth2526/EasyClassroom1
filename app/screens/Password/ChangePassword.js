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
import * as firebase from "firebase";
import "firebase/firestore";
import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function ChangePassword({ navigation }) {
  const [oldPassword, setoldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function Password(oldPassword, password) {
    const user = firebase.auth().currentUser;

    React.useEffect(() => {
      StatusBar.setBackgroundColor("#cdaffa");
      StatusBar.setTranslucent(true);
    }, []);

    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, oldPassword)
      .then(() => {
        return user.updatePassword(password);
      })
      .then(function (user) {
        Alert.alert("password has changed successfully!");
        navigation.goBack();
      })
      .catch(function (e) {
        console.log(e);
        Alert.alert("Old password is incorrect");
      });
  }

  const handlePress = () => {
    if (!oldPassword) {
      Alert.alert("oldPassword field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      setisLoading(true);
      Password(oldPassword, password);
      setoldPassword("");
      setPassword("");
      setisLoading(false);
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
            Change Password
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

      <View style={{ alignSelf: "center", marginBottom: hp("4%") }}>
        <FontAwesome5 name="user-lock" size={hp("12%")} color="#cdaffa" />
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("33%") }}>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Old Password</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your Old Password"
                value={oldPassword}
                onChangeText={(oldPassword) => setoldPassword(oldPassword)}
                secureTextEntry={true}
                style={styles.textinput}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>New Password </Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your New password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
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
    marginLeft: wp("10%"),

    width: wp("75%"),
  },
  text: {
    marginTop: -20,
    fontWeight: "bold",
    fontSize: 20,
  },

  cardtext: {
    fontSize: hp("2.4%"),
    fontWeight: "500",
    marginBottom: hp("1%"),
  },
  inlineText: {
    color: "blue",
    marginTop: "10%",
    alignSelf: "center",
  },

  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    marginBottom: "10%",
    alignItems: "center",
    padding: 10,
  },
  action: {
    marginTop: hp("0.5%"),
    width: wp("80%"),
    borderRadius: 10,
    marginBottom: hp("2%"),

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
    fontSize: hp("2.3%"),
    paddingLeft: 8,
  },

  buttonLogin: {
    backgroundColor: "#cdaffa",
    alignSelf: "center",
    height: hp("7%"),
    borderRadius: 9,
    marginTop: hp("4%"),
    justifyContent: "center",
    width: wp("55%"),
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
    fontWeight: "400",
    alignSelf: "center",
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

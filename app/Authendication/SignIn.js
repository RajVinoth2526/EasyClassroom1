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
import { signIn } from "../../API/firebaseMethods/firebaseMethod";
import Modal from "react-native-modal";
import { color } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [flag, setflag] = useState(false);

  React.useEffect(() => {
    StatusBar.setBackgroundColor("white");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = () => {
    if (!email) {
      Alert.alert("email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      setisLoading(true);

      const FLAG = signIn(email, password).then(() => {
        setisLoading(false);
        setflag(FLAG);
      });

      setEmail("");
      setPassword("");
    }
  };

  if (flag == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#03befc" size="large" />
      </View>
    );
  }

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
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
        <Text style={styles.text}>TIME TO LEARN</Text>
      </View>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView style={{ height: hp("33%") }}>
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

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Password </Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonLogin} onPress={handlePress}>
        <Text style={styles.buttontext}>SignIn</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("VerifyRole")}>
        <Text style={styles.inlineText}>Don't have an account?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text
          style={{
            alignSelf: "center",
            color: "red",
            fontWeight: "bold",
            marginTop: hp("2%"),
          }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginLeft: hp("5%"),

    width: wp("80%"),
  },
  text: {
    fontWeight: "bold",
    color: "black",
    marginTop: hp("0%"),
    fontSize: hp("2.5%"),
    marginBottom: hp("6%"),
    fontWeight: "bold",
  },

  cardtext: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  inlineText: {
    color: "#cdaffa",
    marginTop: hp("4%"),
    alignSelf: "center",
    fontWeight: "bold",
  },

  logoContainer: {
    marginTop: hp("5%"),
    alignItems: "center",
  },
  action: {
    marginTop: hp("1%"),

    borderRadius: 10,

    marginBottom: 20,

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },

  textinput: {
    color: "black",
    height: hp("7%"),
    fontSize: hp("2.4%"),
    paddingLeft: 8,
  },

  buttonLogin: {
    backgroundColor: "#cdaffa",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("8%"),
    borderRadius: 9,
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
    alignSelf: "center",
    fontWeight: "bold",
  },

  Loadingcontainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  logo: {
    width: wp("50%"),
    height: hp("20%"),
  },
});

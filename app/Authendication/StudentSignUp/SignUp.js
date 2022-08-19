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
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "react-navigation";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StudentRegistration } from "../../../API/firebaseMethods/firebaseMethod";
import * as firebase from "firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";

import IMAGE from "../../assets/profile-placeholder.png";
import { StatusBar } from "react-native";
export default function StudentSignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [district, setDistrict] = useState("");
  const [course, setCourse] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [faculty, setFaculty] = useState("");
  //const [department, setDeparment] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
  const [isLoading, setisLoading] = useState(false);

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setDOB("");
    setDistrict("");
    setCourse("");
    setRegistrationNumber("");
    setIndexNumber("");
    setFaculty("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required");
    } else if (!lastName) {
      Alert.alert("Last name field is required.");
    } else if (!registrationNumber) {
      Alert.alert("Last name field is required.");
    } else if (!indexNumber) {
      Alert.alert("Last name field is required.");
    } else if (!gender) {
      Alert.alert("gender field is required.");
    } else if (!district) {
      Alert.alert("District field is required.");
    } else if (!course) {
      Alert.alert("Course field is required.");
    } else if (!faculty) {
      Alert.alert("Faculty field is required.");
    } else if (!email) {
      Alert.alert("email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      setisLoading(true);
      const flag = StudentRegistration(
        email,
        password,
        lastName,
        firstName,
        registrationNumber,
        indexNumber,
        gender,
        district,
        course,
        faculty,
        image
      ).then(() => {
        setisLoading(false);
      });
      if (flag == true) {
        navigation.navigate("Loading");
        emptyState();
      }
    }
  };

  if (isLoading == true) {
    return (
      <View style={styles.Loadingcontainer}>
        <Text>Creating New account</Text>
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
            SignUp
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

      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>First Name</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="First name"
                value={firstName}
                onChangeText={(name) => setFirstName(name)}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Last Name</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Last name"
                value={lastName}
                onChangeText={(name) => setLastName(name)}
              />
            </View>
          </View>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>registration Number</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Registration Number"
                value={registrationNumber}
                onChangeText={(registrationNumber) =>
                  setRegistrationNumber(registrationNumber)
                }
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Index Number</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="index number"
                value={indexNumber}
                onChangeText={(indexNumber) => setIndexNumber(indexNumber)}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{gender ? ` Gender is ${gender}` : "Select Gender"}</Text>
            </Text>

            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(gender) => setGender(gender)}
                items={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>
                {faculty ? ` faculty is ${faculty}` : "Select faculty"}
              </Text>
            </Text>
            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(faculty) => setFaculty(faculty)}
                items={[
                  { label: "Science", value: "Science" },
                  { label: "Medical", value: "Medical" },
                  { label: "Managment", value: "Managment" },
                ]}
              />
            </View>
          </View>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>
              <Text>{course ? ` ${course}` : "Select course"}</Text>
            </Text>
            <View style={styles.action}>
              <RNPickerSelect
                onValueChange={(course) => setCourse(course)}
                items={[
                  { label: "Computer Science", value: "Computer Science" },
                  { label: "Physical Science", value: "Physical SCience" },
                  { label: "Bio SCience", value: "Bio SCience" },
                ]}
              />
            </View>
          </View>
          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>District</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your district"
                value={district}
                onChangeText={(district) => setDistrict(district)}
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Email</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Password</Text>
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

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Retype Password</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textinput}
                placeholder="Retype your password "
                value={confirmPassword}
                onChangeText={(password2) => setConfirmPassword(password2)}
                secureTextEntry={true}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonSignup} onPress={handlePress}>
        <Text style={styles.SignUpText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
        <Text style={styles.inlineText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  datePickerStyle: {
    width: 200,
  },
  scrollView: {
    height: hp("55%"),
    width: wp("90%"),
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: hp("5%"),
    backgroundColor: "#ffffff",
  },

  cardCont: {
    marginTop: hp("1%"),
    alignSelf: "center",
    width: wp("78%"),
  },
  text: {
    alignSelf: "center",
    marginTop: hp("4%"),
    fontSize: 30,
    fontWeight: "bold",
  },

  cardtext: {
    marginLeft: wp("1%"),
    fontSize: hp("2.4%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  action: {
    justifyContent: "center",
    borderRadius: 10,
    height: hp("6%"),
    marginBottom: hp("1%"),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  textinput: {
    marginLeft: wp("3%"),
    color: "black",
    fontSize: hp("2.2%"),
  },

  buttonSignup: {
    backgroundColor: "#cdaffa",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("8%"),
    borderRadius: 9,
    marginBottom: hp("0.1%"),
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  SignUpText: {
    fontSize: hp("3%"),
    alignSelf: "center",
    fontWeight: "bold",
  },

  inlineText: {
    color: "red",
    marginTop: hp("1.5%"),
    marginBottom: hp("4%"),
    alignSelf: "center",
  },

  buttontext: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 7,
  },

  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

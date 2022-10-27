import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function LecturerHomeScreen({ navigation }) {
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
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("30%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("30%"),
            borderBottomRightRadius: 60,
            justifyContent: "center",
          }}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("./../../../assets/ec.png")}
            ></Image>
            <Text
              style={{
                alignSelf: "center",
                fontSize: hp("2%"),
                fontWeight: "bold",
              }}
            >
              {" "}
              TIME TO LEARN{" "}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("8%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("8%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>

      <ScrollView style={styles.scrollScreen}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.box}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClassroomWelcome");
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Entypo name="book" size={hp("7%")} color="black" />
                </View>

                <Text style={{ fontSize: hp("2%"), fontWeight: "600" }}>
                  Classroom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TimeTable");
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <MaterialCommunityIcons
                    name="table-clock"
                    size={hp("7%")}
                    color="black"
                  />
                </View>

                <Text style={{ fontSize: hp("2%"), fontWeight: "600" }}>
                  TimeTable
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.box}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Noticeboard");
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <MaterialCommunityIcons
                    name="text-box-multiple"
                    size={hp("7%")}
                    color="black"
                  />
                </View>

                <Text style={{ fontSize: hp("2%"), fontWeight: "600" }}>
                  Noticeboard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Results");
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Foundation name="results" size={hp("7%")} color="black" />
                </View>

                <Text style={{ fontSize: hp("2%"), fontWeight: "600" }}>
                  Results
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.box}>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity>
                <View style={{ alignSelf: "center" }}>
                  <MaterialCommunityIcons
                    name="text-box-multiple"
                    size={hp("7%")}
                    color="black"
                  />
                </View>

                <Text style={{ fontSize: hp("2%"), fontWeight: "600" }}>
                  Pay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
  },
  scrollScreen: {
    backgroundColor: "white",
    alignSelf: "center",
  },
  homeContent: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    marginBottom: hp("0.5%"),
    backgroundColor: "#f2ffff",
    height: hp("18%"),
    width: wp("96%"),
    borderRadius: 10,
  },
  homeContentText: {
    alignSelf: "center",
    fontSize: hp("4.5%"),
    fontWeight: "600",
  },
  HomeHEAD: {
    alignSelf: "center",
    backgroundColor: "#cdaffa",
    height: hp("30%"),
    width: wp("100%"),
    borderBottomRightRadius: 60,
  },
  logoContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    width: wp("40%"),
    height: hp("20%"),
  },
  box: {
    width: wp("40%"),
    height: hp("19%"),
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: hp("3%"),

    marginRight: wp("3%"),
    marginLeft: wp("3%"),
    backgroundColor: "#edaffa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
});

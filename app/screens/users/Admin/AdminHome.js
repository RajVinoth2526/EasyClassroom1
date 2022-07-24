import React from "react";

import { View, Text, StyleSheet, TouchableOpacity,BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  useFocusEffect
 } from '@react-navigation/native';
 import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function AdminHomeScreen({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {    
      const onBackPress = () => {
        BackHandler.exitApp();
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };
 
      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
 
      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollScreen}>
        <View style={[styles.homeContent, { backgroundColor: "#bef7df" }]}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("AcademyYear");
            }}
          >
          <Text style={styles.homeContentText}>
            <Entypo name="book" size={24} color="black" /> Courses
          </Text>
        </TouchableOpacity>
        </View>

        <View style={[styles.homeContent, { backgroundColor: "#f1fae8" }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TimeTable");
            }}
          >
            <Text style={styles.homeContentText}>
              {" "}
              <MaterialCommunityIcons
                name="table-clock"
                size={25}
                color="black"
              />{" "}
              Time Table
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.homeContent, { backgroundColor: "#ffeab8" }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Noticeboard");
            }}
          >
            <Text style={styles.homeContentText}>
              <MaterialCommunityIcons
                name="text-box-multiple"
                size={25}
                color="black"
              />{" "}
              Noticeboard
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.homeContent, { backgroundColor: "#c2bdf0" }]}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddResults");
            }}
          >
          <Text style={styles.homeContentText}>
            <Foundation name="results" size={24} color="black" /> Add Results
          </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.homeContent, { backgroundColor: "#f0bdbd" }]}>
          <Text style={styles.homeContentText}>
            <FontAwesome name="calendar" size={24} color="black" /> Calender
          </Text>
        </View>

        <View style={[styles.homeContent, { backgroundColor: "#e2bdf0" }]}>
          <Text style={styles.homeContentText}>
            <MaterialIcons name="payment" size={24} color="black" /> Pay
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
   
   
  },
  scrollScreen: {
    flex :1,
    
    width:wp('100%'),
    alignSelf:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0.5,
  },
  homeContent: {
    alignSelf: "center",
    justifyContent:'center',
    alignItems: "center",
    marginTop: hp('0.5%'),
    borderBottomColor:'black',
    borderBottomWidth:0.5,
    borderBottomRightRadius:6,
    borderBottomLeftRadius:6,
    marginBottom:hp('0.5%'),
    backgroundColor: "#f2ffff",
    height: hp('18%'),
    width:wp('96%'),
    borderRadius: 10,
   
  },
  homeContentText: {
    alignSelf: "center",
    fontSize: hp('4.5%'),
    fontWeight:'600'
  },
});

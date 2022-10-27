import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  keyboardVerticalOffset,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import * as firebase from "firebase";
//import { UploadPost } from '../../../../API/firebaseMethods/firebaseMethod';
//import IMAGE from '../../../assets/photo.png';
import { MaterialIcons } from "@expo/vector-icons";
import { EditPost } from "../../../API/firebaseMethods/firebaseMethod";
import { FontAwesome } from "@expo/vector-icons";
import { EditNotice } from "../../../API/firebaseMethods/firebaseMethod";
import { normalizeUnits } from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function EditNoticeScreen({ navigation, route }) {
  const [notice, setNotice] = useState("");
  const [title, setTitle] = useState("");
  const [notice1, setNotice1] = useState("");
  const [title1, setTitle1] = useState("");
  const { PostId } = route.params;
  const {Type} = route.params;
  const {Faculty} = route.params;
 
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  const handlePress = () => {
     if(!title1  ){
      EditNotice(PostId, notice1, title, Type,Faculty);
      navigation.goBack();
      Alert.alert("notice Updated!!");
    }if(!notice1){
      EditNotice(PostId, notice, title1, Type , Faculty);
      navigation.goBack();
      Alert.alert("notice Updated!!");
    }if(!notice1 && !title1){
      EditNotice(PostId, notice, title, Type , Faculty);
      navigation.goBack();
      Alert.alert("notice Updated!!");
    }if(notice1 && title1){
      EditNotice(PostId, notice1, title1, Type , Faculty);
      navigation.goBack();
      Alert.alert("notice Updated!!");

    }
  };

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection(Faculty+"Notices")
        .doc(PostId)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setNotice(dataObj.notice);

        setTitle(dataObj.title);
      }
    }
    getUserInfo();
  });

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "#cdaffa",
            height: hp("10%"),
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
            Edit Notice
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#cdaffa", height: hp("10%") }}>
        <View
          style={{
            backgroundColor: "white",
            height: hp("10%"),
            borderTopLeftRadius: 60,
          }}
        ></View>
      </View>



      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView style={{height:hp('40%'),marginTop:hp('10%')}}>
        <View>
       
       

          

         
         
        

          <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Title</Text>
            <View style={styles.action}>
                <TextInput
                  style={styles.textinput}
                  editable={true}
                  defaultValue ={title}
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                  onChangeText={(title1) => setTitle1(title1)}
                />
              </View>
          </View>

          < View style={styles.cardCont}>
            <Text style={styles.cardtext}>Content</Text>
            <View style={styles.action1}>
                <TextInput
                  style={styles.textinput}
                  editable={true}
                  defaultValue={notice}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical="top"
                  onChangeText={(notice1) => setNotice1(notice1)}
                />
              </View>
          </View>

         

         

          


           
          

            
          </View>

        </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.buttonSignup}  onPress={handlePress}>
            <Text style={styles.SignUpText}>Upload</Text>
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
  photoUpload:{
    alignSelf:'flex-end',
    marginRight:wp('20%'),
    marginTop:hp('3%')

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
    marginBottom: hp("3%"),
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
  action1: {
    justifyContent: "center",

    borderRadius: 10,
    height: hp("15%"),
    marginBottom: hp("3%"),
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
  avatar: {
    height: hp("20%"),
                    width: wp("60%"),
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor:'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
  },
});

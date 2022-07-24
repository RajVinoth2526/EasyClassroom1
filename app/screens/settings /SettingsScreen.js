import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View,StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function SettingScreen({navigation}) {

  const handlePress1 = () =>{
    navigation.navigate("ChangePassword");
  }

  const handlePress2 = () =>{
    navigation.navigate("ForgotPassword");
  }
  return (
    <View style ={styles.container}>
      <View style ={styles.head}>
        <Text ><Ionicons name="ios-settings" size={60} color="#34dbeb" /></Text>
      </View>
      <View style = {styles.Box}>
      <TouchableOpacity onPress={handlePress1}>
        <Text style={{alignSelf:'center',fontSize:hp('2.5%')}}>Change password</Text>
      </TouchableOpacity>
      </View>

      <View style = {styles.Box}>
      <TouchableOpacity onPress={handlePress2}>
        <Text style={{alignSelf:'center',fontSize:hp('2.5%')}}>Forgot Password</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
 container :{


 },
 Box:{
  alignSelf :'center',
  justifyContent:'center',
  height:hp('10%'),
  width:wp('60%'),
  borderRadius:15,
  backgroundColor:'#8be5f7',
 marginTop:hp('3%')
 },
 head:{
  alignSelf:'center',
  marginTop:hp('14%'),
  marginBottom:hp('3%')
 }
});
import React ,{useState,useEffect}from 'react';
import * as firebase from 'firebase';
import {View,Text,RefreshControl,StyleSheet,TouchableOpacity,Image,ActivityIndicator,FlatList,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';






export default function RefreshPostScreen({navigation}){

 
  

  
    
    navigation.replace('PostScreen')


    
   

    
 

return(
  <View style={styles.Loadingcontainer}>
        
        
        <ActivityIndicator color="#03befc" size="large" />
   </View>
);
}

const styles = StyleSheet.create({
  
  Loadingcontainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
})





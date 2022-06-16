import React from 'react';

import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

export default function LecturerHomeScreen({navigation}){

    
    
 
    return(
    <View style={styles.container}>
      <ScrollView style = {styles.scrollScreen} >

      <View style = {[styles.homeContent ,{backgroundColor : '#bef7df'}]}> 
        <TouchableOpacity onPress={() =>{ navigation.navigate('ClassroomWelcome')}}>
          <Text style = {styles.homeContentText}><Entypo name="book" size={24} color="black" /> Classroom</Text>
        </TouchableOpacity>
      </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#f1fae8'}]}>  
          <TouchableOpacity onPress={() =>{ navigation.navigate('TimeTable')}}>
            <Text style = {styles.homeContentText}> <MaterialCommunityIcons name="table-clock" size={25} color="black" /> Time Table</Text>
          </TouchableOpacity>
       </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#ffeab8'}]}> 
            <TouchableOpacity onPress={() =>{ navigation.navigate('Noticeboard')}}>
        
              <Text style = {styles.homeContentText}><MaterialCommunityIcons name="text-box-multiple" size={25} color="black" /> Noticeboard</Text>
         
             </TouchableOpacity>
          </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#c2bdf0'}]}> 
          <Text style = {styles.homeContentText}><Foundation name="results" size={24} color="black" />  Results</Text>
        </View>


        <View style = {[styles.homeContent ,{backgroundColor : '#f0bdbd'}]}> 
          <Text style = {styles.homeContentText}><FontAwesome name="calendar" size={24} color="black" /> Calender</Text>
        </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#e2bdf0'}]}> 
          <Text style = {styles.homeContentText}><MaterialIcons name="payment" size={24} color="black" /> Pay</Text>
        </View>

        

        

      


      </ScrollView>
     
      
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      paddingTop: 30,
     
      backgroundColor: "white",
    },
    scrollScreen :{
      marginTop : 5,
      marginRight : 10,
      marginBottom : 115,
      borderRadius : 10,
      marginLeft:10,
      backgroundColor :'white',
      marginHorizontal: 1,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 0.5,
      
  
    },
    homeContent :{
     
      marginTop : 10,
      alignSelf :"center",
      marginBottom : 15,
      backgroundColor :'#f2ffff',
      height : 120,
      width : 290,
      borderRadius : 10,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 2,
      shadowRadius: 5,
      elevation: 8,
    },
    homeContentText :{
      
      alignSelf :'center',
      marginTop : 35,
      fontSize : 28,

    }
})
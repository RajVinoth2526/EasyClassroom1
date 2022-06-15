import React from 'react';
import { Octicons } from '@expo/vector-icons';

import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NoticeboardScreen({navigation}){

  const handler1 = () =>{
    navigation.navigate('UniversityNoticeboard');
  }

  const handler2 = () =>{
    navigation.navigate('FacultyNoticeboard');
  }

  const handler3 = () =>{
    navigation.navigate('DepartmentNoticeboard');
  }

  


    
    
 
    return(
    <View style={styles.container}>
        <View style = {styles.head}>
           
            <Text style = {styles.headText}><Octicons name="note" size={30} color="#34dbeb" /> Noticeboard</Text>
        </View>
      

        

        <View style = {[styles.homeContent ,{backgroundColor : '#bef7df'}]}>
          <TouchableOpacity onPress={handler1}>
          <Text style = {styles.homeContentText}><MaterialCommunityIcons name="text-box-multiple" size={25} color="black" /> University</Text>
          </TouchableOpacity> 
        </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#ffeab8'}]}>
        <TouchableOpacity onPress={handler2}> 
          <Text style = {styles.homeContentText}><MaterialCommunityIcons name="text-box-multiple" size={25} color="black" /> Faculty</Text>
          </TouchableOpacity>
        </View>

        <View style = {[styles.homeContent ,{backgroundColor : '#e2bdf0'}]}> 
        <TouchableOpacity onPress={handler3}>
          <Text style = {styles.homeContentText}><MaterialCommunityIcons name="text-box-multiple" size={25} color="black" /> Department</Text>
          </TouchableOpacity>
        </View>


      


    
      
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      paddingTop: 30,
      backgroundColor : 'white'
     
     
    },
   
    NoticeIcon :{
      marginLeft : -30,
      
      

    },
    homeContent :{
      alignSelf :'center',
      alignItems :'center',
      marginTop : 10,
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
      shadowOpacity: 6,
      shadowRadius: 10,
      elevation: 8,
    },
    homeContentText :{
      alignSelf : 'center',
      marginTop : 30,
      fontSize : 30,

    },
    head : {
        alignSelf : 'center',
        marginTop : 65,
        marginBottom : 50,
       alignSelf :'center'
        
    },
    headText : {
        fontSize : 30,
        marginTop : -40,
        marginLeft : 10

    }
}) 
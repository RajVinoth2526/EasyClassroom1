import React from 'react';

import {View,Text,TouchableOpacity, StyleSheet} from 'react-native';


export default function LecturerSearchScreen({navigation}){

  return(
    <View style={styles.container}>
        <Text>SearchScreen</Text>
    </View>
);
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 15,
  paddingTop: 30,
 
  backgroundColor: "white",
}
})
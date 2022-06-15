import React , { useEffect, useState } from 'react';
import {
    View,
    Button,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';





export default function ProfileImage(){

    const currentUser = firebase.auth().currentUser;

    const currentUserUID = firebase.auth().currentUser.uid;

   // const [photo,setPoto] = useState(null);

    const IMAGENAME = require('../assets/profile-placeholder.png');

    const [photoURL, setPhotoURL] = useState(IMAGENAME);

  

    const pickImageHandler = async () => {
        let result = await  ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
          });
       
        if(!result.cancelled){
            const URL = uploadImage(result.uri, currentUserUID)
            .then(() => {
                console.log(URL);
                setPhotoURL(URL);
                Alert.alert("Uploaded");

            })
            .catch((error) =>{
                Alert.alert('Error:',error.message);

            });
        }
    }

    const uploadImage = async (uri , imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child(imageName);

        

        const snapshot = await ref.put(blob);
        blob.close();

        return await snapshot.ref.getDownloadURL();

    

        
        

       

        

    }

    useEffect(() => {
        if(currentUser?.photoURL){
            setPhotoURL(currentUser.setPhotoURL)
        }
        
;    },[currentUser])


    return(
        <View style = {StyleSheet.container}>
             <Image
                style = { styles.avatar}
                source={photoURL}
                >
            </Image>
           
            <Button title = "choose image" onPress ={pickImageHandler}/>

        </View>
    ) 
}


const styles = StyleSheet.create({
    container :{
       
        alignItems :'center'
    },
    avatar : {
        marginTop: 20,
        height : 100,
        width :100,
        borderRadius : 90,
        borderWidth : 5,
        borderColor : 'white',
        alignSelf :'center',

  
      }

})

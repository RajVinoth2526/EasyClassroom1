
import React , { useEffect, useState } from 'react';
import {RefreshControl,ActivityIndicator, View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UpdateStudent } from '../../../API/firebaseMethods/firebaseMethod';
import { Update } from '../../../API/firebaseMethods/firebaseMethod';
import * as firebase from "firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function UpdateProfile({ navigation }) {
    let currentUserUID = firebase.auth().currentUser.uid;
    const currentUser = firebase.auth().currentUser;

    
    const [updateFirstName, setupdateFirstName] = useState('');
    const [updateLastName, setupdateLastName] = useState('');
    const [role, setRole] = useState('');
    const [updateDepartment, setupdateDepartment] = useState('');
    const [updateDistrict, setupdateDistrict] = useState('');
    const [updateFaculty, setupdateFaculty] = useState('');
    const [updateID, setupdateID] = useState('');
    const [updateGender, setupdateGender] = useState('');
    const [updateCourse, setupdateCourse] = useState('');
    const [updateIndexNumber, setupdateIndexNumber] = useState('');
    const [updateRegistrationNumber, setupdateRegistrationNumber] = useState('');
    
   
   


    useEffect(() => {
        async function getUserInfo(){
          let doc = await firebase
          .firestore()
          .collection("users")
          .doc(currentUserUID)
          .get();
    
          if (!doc.exists){
            Alert.alert('No user data found!')
          } else {
            let dataObj = doc.data();
            
            
            setRole(dataObj.role) 
           
           
          }
        }
        getUserInfo();
      })
    
      const emptyState1 = () => {
        setupdateFirstName('');
        setupdateLastName('');
        setupdateGender('');
        setupdateIndexNumber('');
        setupdateRegistrationNumber('');
        setupdateFaculty('');
        setupdateCourse('');
        setupdateDistrict('');
       
    }


    const emptyState2 = () => {
      setupdateID('');
      setupdateFirstName('');
      setupdateLastName('');
      setupdateGender('');
      setupdateFaculty('');
      setupdateCourse('');
      setupdateDistrict('');
      setupdateDepartment('');  
  }

    const handlePress1 = () => {

        
    
    if (!updateFirstName) {
      Alert.alert('First name is required');
    }else if (!updateLastName) {
      Alert.alert('Last name field is required.');
    }else if (!updateGender) {
      Alert.alert('gender field is required.');
    }else if (!updateGender) {
      Alert.alert('District field is required.');
    }else if (!updateIndexNumber) {
      Alert.alert('Course field is required.');
    }else if (!updateRegistrationNumber) {
      Alert.alert('role field is required.');
    }else if (!updateFaculty) {
      Alert.alert('Faculty field is required.');
    }else if (!updateDistrict) {
        Alert.alert('email field is required.');
    } else {

     
          UpdateStudent(
            updateFirstName,
            updateLastName,
            updateGender,
            updateIndexNumber,
            updateRegistrationNumber,
            updateFaculty,
            updateCourse,
            updateDistrict,


            
          )

          emptyState1();
          Alert.alert('Prpfile Updated!');
         
          navigation.replace('Dashboard');
    
      

     
    }


    
     

    
     

      
    
  };

  const handlePress2 = () => {

        
    
    if (!updateID) {
      Alert.alert('First name is required');
    } else if (!updateFirstName) {
      Alert.alert('Last name field is required.');
    } else if (!updateLastName) {
      Alert.alert('Last name field is required.');
    }else if (!updateGender) {
      Alert.alert('gender field is required.');
    }else if (!updateGender) {
      Alert.alert('District field is required.');
    }else if (!updateFaculty) {
      Alert.alert('Faculty field is required.');
    }else if (!updateDepartment) {
      Alert.alert('email field is required.');
    }else if (!updateDistrict) {
        Alert.alert('email field is required.');
    } else {

     
        Update(
          updateID,
          updateFirstName,
          updateLastName,
          updateGender,
          updateFaculty,
          updateDepartment,
          updateDistrict,
        )
     
      navigation.replace('Dashboard');
      emptyState2();

      

    }


    return(

      <View style={styles.Loadingcontainer}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo.png")}
      ></Image>
      <Text style={{color: 'black', fontSize: 40}}>Easy Classroom</Text>
      <ActivityIndicator color="blue" size="large" />
    </View>

    )
      
    
  };


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  if(role == 'Student'){


    return (

      <SafeAreaView style={styles.container}>
  
         
              
                   
        
        <View style={styles.editTextContainer} >
          <AntDesign name="edit" size={30} color="#34dbeb" />
          <Text style={styles.editText}>Edit Profile </Text>
        </View>
        <ScrollView style={styles.scrollView}
        
       
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
     
       <View >
         
  
          
  
         <View style={styles.cardCont}>
              <Text style={styles.cardtext}>First Name</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter FirstName"
              value={updateFirstName}
              onChangeText={(updateFirstName) => setupdateFirstName(updateFirstName)} />
              </View>
          </View>
  
          <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Last Name</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter FirstNmae"
              value={updateLastName}
              onChangeText={(updateLastName) => setupdateLastName(updateLastName)} />
              </View>
          </View>
  
          
  
          <View style={styles.cardCont}>
          <Text style={styles.cardtext}>
              <Text>
                      {updateGender ?
                      ` Gender is  ${updateGender}` :
                          "Select Gender"
                      }
              </Text>
              </Text>
  
              <View style={styles.action}>
              <RNPickerSelect
              onValueChange={(updateGender)  => setupdateGender(updateGender)}
              
          
              items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              
              
              ]} />
              </View>
           </View>
  
      
  
          <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Index Number</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter your index number"
              value={updateIndexNumber}
              onChangeText={(updateIndexNumber) => setupdateIndexNumber(updateIndexNumber)} />
              </View>
          </View>
  
          <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Registration Number</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter your registration number"
              value={updateRegistrationNumber}
              onChangeText={(updateRegistrationNumber) => setupdateRegistrationNumber(updateRegistrationNumber)} />
              </View>
          </View>
  
          <View style={styles.cardCont}>
              <Text style={styles.cardtext}>Faculty</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter your faculty"
              value={updateFaculty}
              onChangeText={(updateFaculty) => setupdateFaculty(updateFaculty)} />
              </View>
          </View>
  
          <View style={styles.cardCont}>
          <Text style={styles.cardtext}>
              <Text>
                      {updateCourse ?
                      ` Course is ${updateCourse}` :
                          "Select Course"
                      }
              </Text>
              </Text>
  
              <View style={styles.action}>
              <RNPickerSelect
              onValueChange={(updateCourse)  => setupdateCourse(updateCourse)}
          
              items={[
              { label: "Computer Science", value: "Computer Science" },
              { label: "Physical Science", value: "Physical Science" },
              
              
              ]} />
              </View>
           </View>
         
       
        
  
         
          
          <View style={styles.cardCont}>
              <Text style={styles.cardtext}>District</Text>
              <View style={styles.action}>
              <TextInput  
              style={styles.textinput}
              placeholder=  "enter your district"
              value={updateDistrict}
              onChangeText={(updateDistrict) => setupdateDistrict(updateDistrict)} />
              </View>
          </View>
  
       </View>
  
       <TouchableOpacity  style = {styles.buttonUpdate} onPress={handlePress1}>
            <MaterialCommunityIcons name="update" size={50} color="#02b2f2" />
             <Text style={styles.updateText}>Update</Text>
       </TouchableOpacity>
  
      </ScrollView>
         
  
            
          
    </SafeAreaView>
      
    );
  }

else if(role == 'Lecturer'){

  return (

    <SafeAreaView style={styles.container}>

       
            
                 
      
      <View style={styles.editTextContainer} >
        <AntDesign name="edit" size={30} color="#34dbeb" />
        <Text style={styles.editText}>Edit Profile </Text>
      </View>
      <ScrollView style={styles.scrollView}>
   
     <View >
       

     <View style={styles.cardCont}>
            <Text style={styles.cardtext}>ID</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "ID"
            value={updateID}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            onChangeText={(updateID) => setupdateID(updateID)} />
            </View>
        </View>

       <View style={styles.cardCont}>
            <Text style={styles.cardtext}>First Name</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "enter FirstName"
            value={updateFirstName}
            onChangeText={(updateFirstName) => setupdateFirstName(updateFirstName)} />
            </View>
        </View>

        <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Last Name</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "enter FirstNmae"
            value={updateLastName}
            onChangeText={(updateLastName) => setupdateLastName(updateLastName)} />
            </View>
        </View>

        

        <View style={styles.cardCont}>
        <Text style={styles.cardtext}>
            <Text>
                    {updateGender ?
                    ` Gender is  ${updateGender}` :
                        "Select Gender"
                    }
            </Text>
            </Text>

            <View style={styles.action}>
            <RNPickerSelect
            onValueChange={(updateGender)  => setupdateGender(updateGender)}
            
        
            items={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            
            
            ]} />
            </View>
         </View>

    

        <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Faculty</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "enter your faculty"
            value={updateFaculty}
            onChangeText={(updateFaculty) => setupdateFaculty(updateFaculty)} />
            </View>
        </View>

        <View style={styles.cardCont}>
            <Text style={styles.cardtext}>Deparment</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "enter your Department"
            value={updateDepartment}
            onChangeText={(updateDepartment) => setupdateDepartment(updateDepartment)} />
            </View>
        </View>
     
       <View style={styles.cardCont}>
            <Text style={styles.cardtext}>District</Text>
            <View style={styles.action}>
            <TextInput  
            style={styles.textinput}
            placeholder=  "enter your district"
            value={updateDistrict}
            onChangeText={(updateDistrict) => setupdateDistrict(updateDistrict)} />
            </View>
        </View>

     </View>

     <TouchableOpacity  style = {styles.buttonUpdate} onPress={handlePress2}>
          <MaterialCommunityIcons name="update" size={50} color="#02b2f2" />
           <Text style={styles.updateText}>Update</Text>
     </TouchableOpacity>

    </ScrollView>
       

          
        
  </SafeAreaView>
    
  );


}

else if (role == 'Demonstrator'){

  return (


    <SafeAreaView style={styles.container}>

       
            
                 
      
    <View style={styles.editTextContainer} >
      <AntDesign name="edit" size={30} color="#34dbeb" />
      <Text style={styles.editText}>Edit Profile </Text>
    </View>
    <ScrollView style={styles.scrollView}>
 
   <View >
     

   <View style={styles.cardCont}>
          <Text style={styles.cardtext}>ID</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "ID"
          value={updateID}
          onChangeText={(updateID) => setupdateID(updateID)} />
          </View>
      </View>

     <View style={styles.cardCont}>
          <Text style={styles.cardtext}>First Name</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter FirstName"
          value={updateFirstName}
          onChangeText={(updateFirstName) => setupdateFirstName(updateFirstName)} />
          </View>
      </View>

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Last Name</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter FirstNmae"
          value={updateLastName}
          onChangeText={(updateLastName) => setupdateLastName(updateLastName)} />
          </View>
      </View>

      

      <View style={styles.cardCont}>
      <Text style={styles.cardtext}>
          <Text>
                  {updateGender ?
                  ` Gender is  ${updateGender}` :
                      "Select Gender"
                  }
          </Text>
          </Text>

          <View style={styles.action}>
          <RNPickerSelect
          onValueChange={(updateGender)  => setupdateGender(updateGender)}
          
      
          items={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          
          
          ]} />
          </View>
       </View>

  

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Faculty</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your faculty"
          value={updateFaculty}
          onChangeText={(updateFaculty) => setupdateFaculty(updateFaculty)} />
          </View>
      </View>

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Deparment</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your Department"
          value={updateDepartment}
          onChangeText={(updateDepartment) => setupdateDepartment(updateDepartment)} />
          </View>
      </View>
   
     <View style={styles.cardCont}>
          <Text style={styles.cardtext}>District</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your district"
          value={updateDistrict}
          onChangeText={(updateDistrict) => setupdateDistrict(updateDistrict)} />
          </View>
      </View>

   </View>

   <TouchableOpacity  style = {styles.buttonUpdate} onPress={handlePress2}>
        <MaterialCommunityIcons name="update" size={50} color="#02b2f2" />
         <Text style={styles.updateText}>Update</Text>
   </TouchableOpacity>

  </ScrollView>
     

        
      
</SafeAreaView>
  
  )



  
}

else if (role == 'Admin'){

  return(

    <SafeAreaView style={styles.container}>

       
            
                 
      
    <View style={styles.editTextContainer} >
      <AntDesign name="edit" size={30} color="#34dbeb" />
      <Text style={styles.editText}>Edit Profile </Text>
    </View>
    <ScrollView style={styles.scrollView}>
 
   <View >
     

   <View style={styles.cardCont}>
          <Text style={styles.cardtext}>ID</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "ID"
          value={updateFirstName}
          onChangeText={(updateID) => setupdateID(updateID)} />
          </View>
      </View>

     <View style={styles.cardCont}>
          <Text style={styles.cardtext}>First Name</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter FirstName"
          value={updateFirstName}
          onChangeText={(updateFirstName) => setupdateFirstName(updateFirstName)} />
          </View>
      </View>

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Last Name</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter FirstNmae"
          value={updateLastName}
          onChangeText={(updateLastName) => setupdateLastName(updateLastName)} />
          </View>
      </View>

      

      <View style={styles.cardCont}>
      <Text style={styles.cardtext}>
          <Text>
                  {updateGender ?
                  ` Gender is  ${updateGender}` :
                      "Select Gender"
                  }
          </Text>
          </Text>

          <View style={styles.action}>
          <RNPickerSelect
          onValueChange={(updateGender)  => setupdateGender(updateGender)}
          
      
          items={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          
          
          ]} />
          </View>
       </View>

  

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Faculty</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your faculty"
          value={updateFaculty}
          onChangeText={(updateFaculty) => setupdateFaculty(updateFaculty)} />
          </View>
      </View>

      <View style={styles.cardCont}>
          <Text style={styles.cardtext}>Deparment</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your Department"
          value={updateDepartment}
          onChangeText={(updateDepartment) => setupdateDepartment(updateDepartment)} />
          </View>
      </View>
   
     <View style={styles.cardCont}>
          <Text style={styles.cardtext}>District</Text>
          <View style={styles.action}>
          <TextInput  
          style={styles.textinput}
          placeholder=  "enter your district"
          value={updateDistrict}
          onChangeText={(updateDistrict) => setupdateDistrict(updateDistrict)} />
          </View>
      </View>

   </View>

   <TouchableOpacity  style = {styles.buttonUpdate} onPress={handlePress2}>
        <MaterialCommunityIcons name="update" size={50} color="#02b2f2" />
         <Text style={styles.updateText}>Update</Text>
   </TouchableOpacity>

  </ScrollView>
     

        
      
</SafeAreaView>
  
  )
}

return(

  <View style={styles.Loadingcontainer}>
        
        
        <ActivityIndicator color="#03befc" size="large" />
      </View>
)





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,

    backgroundColor: "#ffffff",
  },
  datePickerStyle: {
    width: 200,
  
  },
  scrollView: {
    marginTop:20,
    marginBottom: 25,
    width :'100%',
    alignSelf :'center',
    borderRadius:15,
    backgroundColor:'#88e1fc',
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 0.8,

  },

  cardCont: {
    marginTop: 10,
    marginLeft: 20,
    padding : 5,
    width:'80%',
  },
  editText :{
    marginTop: -31,
    marginLeft : 40,
    fontSize : 25,
    fontWeight: 'bold',
  },
  editTextContainer:{
    alignSelf :'center',
    marginTop: 10,
    marginLeft : 5,
  },

  cardtext: {
    marginLeft : 3,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  action: {
    marginTop: 10,
    
  
    
  },

  textinput: {
    marginLeft :20,
    marginTop :-8,
    color: "#92939",
    fontSize: 14,
    padding:5,
    width : '110%',
    borderRadius : 15,
    paddingLeft :10,
    alignSelf :'center',
    backgroundColor :'#e3f8ff',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    
  },

  buttonUpdate: {

    alignSelf: 'center',
   
    marginTop : 50,
    marginBottom :20,
    marginLeft :20,
    marginTop : 10,
    
  },
  
  updateText :{
    fontSize : 12,
    color:'#02b2f2',
    alignSelf: "center",
    fontWeight : 'bold',
  },
 

  inlineText:{
    color:'blue',
    marginTop:10,
    marginBottom : 20,
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
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },

  logo: {
  
    width: 200,
    height: 200,
  },
});

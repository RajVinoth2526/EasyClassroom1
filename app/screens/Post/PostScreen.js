import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { DeletePost } from "../../../API/firebaseMethods/firebaseMethod";
import IMAGE from "../../assets/profile-placeholder.png";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PostScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");
  const [faculty, setFaculty] = useState("");
  const exampleImageUri = Image.resolveAssetSource(IMAGE).uri;
  const [image, setImage] = useState(exampleImageUri);
  const [flag, setFlag] = useState(false);

  const currentUser = firebase.auth().currentUser;

  React.useEffect(() => {
    getUserInfo();
    RefreshPage();
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
      RefreshPage();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  function printId(ID) {
    navigation.navigate("EditPost", { PostID: ID, Faculty: faculty });
  }
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  function deletePost(id) {
    DeletePost(id, faculty);

    getUserInfo();
    RefreshPage();
  }

  function Edit(PostID, PostUserID) {
    if (currentUser.uid == PostUserID) {
      Alert.alert(
        "Edit Post",
        "",

        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Edit", onPress: () => printId(PostID) },
          { text: "Delete", onPress: () => Delete(PostID) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("only You can edit your own post ");
    }
  }

  function Delete(PostID) {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete the Post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deletePost(PostID) },
      ],
      { cancelable: false }
    );
  }

  const handlePress = () => {
    navigation.navigate("AddPostScreen", { Faculty: faculty });
  };

  async function getUserInfo() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      let dataObj = doc.data();
      setRole(dataObj.role);
      setFaculty(dataObj.faculty);
      fetchSubjects(dataObj.faculty).then(() => {
        setFlag(true);
      });
    }
  }

  async function fetchSubjects(Faculty) {
    const data = [];
    const db = firebase.firestore();
    const querySnapshot = await db.collection(Faculty + "-Posts").get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });

    setSubjects(data);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const MINUTE_MS = 10000000000;

  useEffect(() => {
    const interval = setInterval(() => {
      getUserInfo();
      RefreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  function RefreshPage() {
    if (role == "Lecturer" && flag == true) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <FlatList
              data={subjects}
              renderItem={({ item }) => (
                <View style={[styles.Box]}>
                  <View style={styles.head}>
                    <View style={styles.avatar1}>
                      <Image
                        source={{ uri: item.ProfileUrl }}
                        style={{
                          height: hp("5.2%"),
                          width: wp("11%"),
                          borderWidth: 1.5,

                          borderRadius: 50,
                        }}
                      />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.Name}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text
                        style={{
                          marginLeft: wp("5%"),
                          marginBottom: hp("1%"),
                          marginTop: hp("0.5%"),
                          fontSize: hp("1.1%"),
                        }}
                      >
                        {item.DateTime}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.avatar}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{
                        borderRadius: 4,
                        borderWidth: 1.5,
                        marginBottom: 30,
                        borderRadius: 4,
                        height: hp("28%"),
                        width: wp("88%"),
                        alignSelf: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 8,
                      }}
                    />
                  </View>

                  <View style={styles.Msg}>
                    <Text style={styles.msg}>{item.message}</Text>
                  </View>
                  <View
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: wp("6%"),
                      marginBottom: hp("1%"),
                      marginTop: hp("1%"),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => Edit(item.Postid, item.UserId)}
                    >
                      <AntDesign name="edit" size={20} color="#cdaffa" />
                      <Text style={{ fontSize: hp("1.2%") }}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: hp("12%"), width: wp("100%") }}></View>
          </ScrollView>

          <View style={styles.AddIcon}>
            <Ionicons
              name="md-add-circle-sharp"
              size={70}
              color="#cdaffa"
              onPress={handlePress}
            />
          </View>
        </View>
      );
    } else if (role == "Demonstrator" && flag == true) {
      return (
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View style={[styles.Box]}>
                <View style={styles.head}>
                  <View style={styles.avatar1}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        height: hp("5.2%"),
                        width: wp("11%"),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.Name}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: wp("5%"),
                        marginBottom: hp("1%"),
                        marginTop: hp("0.5%"),
                        fontSize: hp("1.1%"),
                      }}
                    >
                      {item.DateTime}
                    </Text>
                  </View>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      borderRadius: 4,
                      borderWidth: 1.5,
                      marginBottom: 30,
                      borderRadius: 4,
                      height: hp("28%"),
                      width: wp("88%"),
                      alignSelf: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 8,
                    }}
                  />
                </View>

                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    } else if (role == "Student" && flag == true) {
      return (
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View style={[styles.Box]}>
                <View style={styles.head}>
                  <View style={styles.avatar1}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        height: hp("5.2%"),
                        width: wp("11%"),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.Name}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: wp("5%"),
                        marginBottom: hp("1%"),
                        marginTop: hp("0.5%"),
                        fontSize: hp("1.1%"),
                      }}
                    >
                      {item.DateTime}
                    </Text>
                  </View>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      borderRadius: 4,
                      borderWidth: 1.5,
                      marginBottom: 30,
                      borderRadius: 4,
                      height: hp("28%"),
                      width: wp("88%"),
                      alignSelf: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 8,
                    }}
                  />
                </View>

                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    }

    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator color="#cdaffa" size="large" />
      </View>
    );
  }

  if (role == "Lecturer" && flag == true) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={subjects}
            renderItem={({ item }) => (
              <View style={[styles.Box]}>
                <View style={styles.head}>
                  <View style={styles.avatar1}>
                    <Image
                      source={{ uri: item.ProfileUrl }}
                      style={{
                        height: hp("5.2%"),
                        width: wp("11%"),
                        borderWidth: 1.5,

                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.Name}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: wp("5%"),
                        marginBottom: hp("1%"),
                        marginTop: hp("0.5%"),
                        fontSize: hp("1.1%"),
                      }}
                    >
                      {item.DateTime}
                    </Text>
                  </View>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      borderRadius: 4,
                      borderWidth: 1.5,
                      marginBottom: 30,
                      borderRadius: 4,
                      height: hp("28%"),
                      width: wp("88%"),
                      alignSelf: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                      elevation: 8,
                    }}
                  />
                </View>

                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.message}</Text>
                </View>
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: wp("6%"),
                    marginBottom: hp("1%"),
                    marginTop: hp("1%"),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => Edit(item.Postid, item.UserId)}
                  >
                    <AntDesign name="edit" size={20} color="#cdaffa" />
                    <Text style={{ fontSize: hp("1.2%") }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ height: hp("12%"), width: wp("100%") }}></View>
        </ScrollView>

        <View style={styles.AddIcon}>
          <Ionicons
            name="md-add-circle-sharp"
            size={70}
            color="#cdaffa"
            onPress={handlePress}
          />
        </View>
      </View>
    );
  } else if (role == "Demonstrator" && flag == true) {
    return (
      <ScrollView
        style={styles.scrollScreen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <View style={[styles.Box]}>
              <View style={styles.head}>
                <View style={styles.avatar1}>
                  <Image
                    source={{ uri: item.ProfileUrl }}
                    style={{
                      height: hp("5.2%"),
                      width: wp("11%"),
                      borderWidth: 1.5,

                      borderRadius: 50,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp("5%"),
                      marginBottom: hp("1%"),
                      marginTop: hp("0.5%"),
                      fontSize: hp("1.1%"),
                    }}
                  >
                    {item.DateTime}
                  </Text>
                </View>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.avatar}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    borderRadius: 4,
                    borderWidth: 1.5,
                    marginBottom: 30,
                    borderRadius: 4,
                    height: hp("28%"),
                    width: wp("88%"),
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    elevation: 8,
                  }}
                />
              </View>

              <View style={styles.Msg}>
                <Text style={styles.msg}>{item.message}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  } else if (role == "Student" && flag == true) {
    return (
      <ScrollView
        style={styles.scrollScreen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={subjects}
          renderItem={({ item }) => (
            <View style={[styles.Box]}>
              <View style={styles.head}>
                <View style={styles.avatar1}>
                  <Image
                    source={{ uri: item.ProfileUrl }}
                    style={{
                      height: hp("5.2%"),
                      width: wp("11%"),
                      borderWidth: 1.5,

                      borderRadius: 50,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.Name}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp("5%"),
                      marginBottom: hp("1%"),
                      marginTop: hp("0.5%"),
                      fontSize: hp("1.1%"),
                    }}
                  >
                    {item.DateTime}
                  </Text>
                </View>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.avatar}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    borderRadius: 4,
                    borderWidth: 1.5,
                    marginBottom: 30,
                    borderRadius: 4,
                    height: hp("28%"),
                    width: wp("88%"),
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    elevation: 8,
                  }}
                />
              </View>

              <View style={styles.Msg}>
                <Text style={styles.msg}>{item.message}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.Loadingcontainer}>
      <ActivityIndicator color="#cdaffa" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AddIcon: {
    position: "absolute",
    alignSelf: "flex-end",

    bottom: 5,
  },
  scrollScreen: {
    height: hp("100%"),
    width: wp("100%"),
  },
  homeContent: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: "2%",
    backgroundColor: "#f2ffff",
    height: 120,
    width: 290,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 8,
  },
  homeContentText: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
  },
  Box: {
    marginTop: hp("1%"),
    alignSelf: "center",
    width: wp("98%"),
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 1,
    borderRadius: 10,
  },
  Msg: {
    marginLeft: wp("4.5%"),
    marginBottom: wp("2%"),
    marginRight: wp("4.5%"),
    marginTop: hp("3%"),

    borderRadius: 5,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: hp("1%"),
    alignSelf: "flex-start",
    marginLeft: wp("8%"),
    marginBottom: hp("2%"),
    fontSize: hp("2.5%"),
    fontWeight: "400",
  },
  Name: {
    alignSelf: "center",
    marginTop: hp("2%"),
    marginLeft: hp("2%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  head: {
    flex: 1,
    marginLeft: wp("4%"),
    marginTop: hp("1%"),
    flexDirection: "row",
    borderBottomColor: "#cdaffa",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  msg: {
    fontSize: hp("1.8%"),
    fontWeight: "350",
    borderWidth: 1,
    borderColor: "#cdaffa",
    borderRadius: 10,
    padding: 10,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: hp("28%"),
    width: wp("88%"),
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 10,
  },
  avatar1: {
    height: hp("5.2%"),
    width: wp("11%"),
    alignSelf: "center",
    borderRadius: 50,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 5,
    shadowRadius: 55,
    elevation: 10,
  },
});

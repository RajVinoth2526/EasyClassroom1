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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { DeleteNotice } from "../../../../API/firebaseMethods/firebaseMethod";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function PostScreen({ navigation, route }) {
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("");
  const NoticeType = "Department";

  const { Faculty } = route.params;

  let currentUserUID = firebase.auth().currentUser.uid;

  React.useEffect(() => {
    fetchSubjects();
    getUserInfo();
    RefreshPage();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchSubjects();
      getUserInfo();
      RefreshPage();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#cdaffa");
    StatusBar.setTranslucent(true);
  }, []);

  function Edit(PostID, PostUserID) {
    if (currentUserUID == PostUserID) {
      Alert.alert(
        "Edit Post",
        "",

        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Edit", onPress: () => editNotice(PostID) },
          { text: "Delete", onPress: () => Delete(PostID) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("only Your can edit your own post ");
    }
  }

  function editNotice(ID) {
    navigation.navigate("EditNotice", {
      PostId: ID,
      Type: NoticeType,
      Faculty: Faculty,
    });
  }

  function deleteNotice(id) {
    DeleteNotice(id, Faculty);
    fetchSubjects();
    getUserInfo();
    RefreshPage();
  }

  function ButtonEdit(PostID, PostUserID) {
    if (currentUserUID == PostUserID) {
      Alert.alert(
        "Edit Post",
        "",

        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Edit", onPress: () => editNotice(PostID) },
          { text: "Delete", onPress: () => Delete(PostID) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("only Your can edit your own post ");
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
        { text: "OK", onPress: () => deleteNotice(PostID) },
      ],
      { cancelable: false }
    );
  }

  const handlePress = () => {
    navigation.navigate("AddNotice", { type: NoticeType });
  };

  async function fetchSubjects() {
    const data = [];

    const db = firebase.firestore();
    const querySnapshot = await db.collection(Faculty + "Notices").get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const dataObj = doc.data();
      if (dataObj.type == "Department") {
        data.push(doc.data());
      }
    });

    setSubjects(data);
  }

  async function getUserInfo() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .get();

    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      let dataObj = doc.data();
      setRole(dataObj.role);
    }
  }
  getUserInfo();
  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {});

  const generateRandomBrightestHSLColor = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," + "80%," + "90%,2)";
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const MINUTE_MS = 10000000;
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubjects();
      getUserInfo();
      RefreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  function RefreshPage() {
    if (role == "Lecturer") {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollScreen}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
                    fontSize: hp("3%"),
                    fontWeight: "bold",
                  }}
                >
                  Department Noticboard
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
                  <View style={styles.Msg}>
                    <Text style={styles.msg}>{item.notice}</Text>

                    <View
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: wp("4%"),
                        marginBottom: hp("1%"),
                        marginTop: hp("2%"),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => Edit(item.id, item.UserID)}
                      >
                        <AntDesign name="edit" size={20} color="#cdaffa" />
                        <Text style={{ fontSize: 8 }}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: hp("12%"), width: wp("100%") }}></View>
          </ScrollView>

          <View style={styles.AddIcon}>
            <TouchableOpacity onPress={handlePress}>
              <MaterialIcons
                name="add-circle"
                size={hp("10%")}
                color="#cdaffa"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (role == "Demonstrator") {
      return (
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  fontSize: hp("3%"),
                  fontWeight: "bold",
                }}
              >
                Department Noticboard
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
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    } else if (role == "Student") {
      return (
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  fontSize: hp("3%"),
                  fontWeight: "bold",
                }}
              >
                Department Noticboard
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
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    } else if (role == "Admin") {
      return (
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  fontSize: hp("3%"),
                  fontWeight: "bold",
                }}
              >
                Department Noticboard
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
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>
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

  if (role == "Lecturer") {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollScreen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  fontSize: hp("3%"),
                  fontWeight: "bold",
                }}
              >
                Department Noticboard
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
                <View style={styles.Msg}>
                  <Text style={styles.msg}>{item.notice}</Text>

                  <View
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: wp("4%"),
                      marginBottom: hp("1%"),
                      marginTop: hp("2%"),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => Edit(item.id, item.UserID)}
                    >
                      <AntDesign name="edit" size={20} color="#cdaffa" />
                      <Text style={{ fontSize: 8 }}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ height: hp("12%"), width: wp("100%") }}></View>
        </ScrollView>

        <View style={styles.AddIcon}>
          <TouchableOpacity onPress={handlePress}>
            <MaterialIcons name="add-circle" size={hp("10%")} color="#cdaffa" />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (role == "Demonstrator") {
    return (
      <ScrollView
        style={styles.scrollScreen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                fontSize: hp("3%"),
                fontWeight: "bold",
              }}
            >
              Department Noticboard
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
              <View style={styles.Msg}>
                <Text style={styles.msg}>{item.notice}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  } else if (role == "Student") {
    return (
      <ScrollView
        style={styles.scrollScreen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                fontSize: hp("3%"),
                fontWeight: "bold",
              }}
            >
              Department Noticboard
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
              <View style={styles.Msg}>
                <Text style={styles.msg}>{item.notice}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  } else if (role == "Admin") {
    return (
      <ScrollView
        style={styles.scrollScreen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                fontSize: hp("3%"),
                fontWeight: "bold",
              }}
            >
              Department Noticboard
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
              <View style={styles.Msg}>
                <Text style={styles.msg}>{item.notice}</Text>
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
    backgroundColor: "white",
  },
  AddIcon: {
    position: "absolute",
    alignSelf: "flex-end",

    bottom: hp("1%"),
  },
  scrollScreen: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "white",
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
    marginBottom: hp("1%"),
    alignSelf: "center",
    width: wp("98%"),

    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 1,
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
  Msg: {
    marginLeft: wp("4.5%"),
    marginBottom: wp("3%"),
    marginRight: wp("4.5%"),
    marginTop: hp("1%"),
    justifyContent: "center",

    borderRadius: 5,
  },
  pic: {
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    marginTop: hp("3%"),
    alignSelf: "center",
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
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    backgroundColor: "white",
    width: wp("11%"),
    alignSelf: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 5,
    shadowRadius: 55,
    elevation: 10,
  },
});

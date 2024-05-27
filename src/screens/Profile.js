import React, { useState, useEffect } from "react";
import {   Dimensions,View, StyleSheet, Text, Modal, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { fontSize as f, colours as c } from "../constants/constants";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import CsBtn from "../components/CsBtn";
import { updateProfile, signOut, selectAuth } from "../reducers/authSlice";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const { user, loading, error } = useSelector(selectAuth);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // Track update action
  const [updateSuccess, setUpdateSuccess] = useState(false); // Track update success

  useEffect(() => {
    if (user) {
      setNewName(user.name || "");
    }
  }, [user]);

  //! Temporary Code to show caching
  // useEffect(() => {
  //   const checkStorage = async () => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       const items = await AsyncStorage.multiGet(keys);
  //       console.log('Stored items:', items);
  //     } catch (error) {
  //       console.error('Error reading AsyncStorage:', error);
  //     }
  //   };

  //   checkStorage();
  // }, []);


  useEffect(() => {
    if (!loading && isUpdating) {
      if (!error) {
        setUpdateSuccess(true);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Profile Updated!',
          text1Style: {
            textAlign: 'center',
            fontSize: f.large,
          },
          bottomOffset: windowHeight/3,
          swipeable: true,
          visibilityTime: 3000,
        });
      } else {
        setUpdateSuccess(false);
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: error,
        });
      }
      setIsUpdating(false); // Reset update action flag
    }
  }, [loading, error, isUpdating]);

  const handleConfirm = () => {
    if (newName.trim() === "" || newPassword.trim() === "") {
      alert("Name and Password cannot be empty");
      return;
    }
    setIsUpdating(true); // Set update action flag
    dispatch(
      updateProfile({
        name: newName,
        password: newPassword,
        token: user.token,
      })
    );
    setModalVisible(false);
  };

  const handleCancel = () => {
    setNewName(user?.name || "");
    setNewPassword("");
    setModalVisible(false);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.reset({
      index: 0,
      routes: [{ name: "Category" }],
    });
  };

  return (
    <View style={styles.container}>
      <Header title="User Profile" />
      <View style={styles.infoBx}>
        <View style={styles.dBx}>
          <View style={styles.detailBx}>
            <Text style={styles.detailTxt}>Name:</Text>
          </View>
          <View style={styles.detailBx2}>
            <Text style={styles.detailTxt2}>{user?.name || ""}</Text>
          </View>
        </View>

        <View style={styles.dBx}>
          <View style={styles.detailBx}>
            <Text style={styles.detailTxt}>Email:</Text>
          </View>
          <View style={styles.detailBx2}>
            <Text style={styles.detailTxt2}>{user?.email || ""}</Text>
          </View>
        </View>
      </View>
      <View style={styles.optionBx}>
        <CsBtn
          onPress={() => setModalVisible(true)}
          color={c.cartBtn}
          title="Update"
        />
        <CsBtn onPress={handleSignOut} color={c.backBtn} title="Sign Out" />
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View>
                <Text style={styles.modalTitle}>Update Profile</Text>
              </View>

              <View style={styles.tag}>
                <Text style={styles.tagTxt}>Name:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newName}
                onChangeText={setNewName}
              />
              <View style={styles.tag}>
                <Text style={styles.tagTxt}>Password:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
              />
              <View style={styles.modalButtonContainer}>
                <CsBtn
                  onPress={handleConfirm}
                  color={c.cartBtn}
                  title="Confirm"
                />
                <CsBtn
                  onPress={handleCancel}
                  color={c.backBtn}
                  title="Cancel"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  tagTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tag: {
    width: "100%",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 10,
  },
  dBx: {
    backgroundColor: "#f0efeb",
  },
  infoBx: {
    margin: 15,
    width: "100%",
    padding: 15,
    gap: 15,
  },
  optionBx: {
    width: "100%",
    padding: 15,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  detailBx: {
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
  },
  detailBx2: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  detailTxt: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 5,
  },
  detailTxt2: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#adb5bd",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 20,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
  },
  modalButtonContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
  },
});

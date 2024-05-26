import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Modal, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import CsBtn from "../components/CsBtn";
import { updateProfile, signOut, selectAuth } from "../reducers/authSlice";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user?.firstName || "");
  const [newLastName, setNewLastName] = useState(user?.lastName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setNewFirstName(user.firstName || "");
      setNewLastName(user.lastName || "");
      setNewEmail(user.email || "");
    }
  }, [user]);

  const handleConfirm = () => {
    dispatch(updateProfile({ firstName: newFirstName, lastName: newLastName, email: newEmail }));
    setModalVisible(false);
  };

  const handleCancel = () => {
    setNewFirstName(user?.firstName || "");
    setNewLastName(user?.lastName || "");
    setNewEmail(user?.email || "");
    setModalVisible(false);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Category' }],
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
            <Text style={styles.detailTxt2}>{`${user?.firstName || ""} ${user?.lastName || ""}`}</Text>
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
        <CsBtn
          onPress={handleSignOut}
          color={c.backBtn}
          title="Sign Out"
        />
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
                <Text style={styles.tagTxt}>First Name:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={newFirstName}
                onChangeText={setNewFirstName}
              />
              <View style={styles.tag}>
                <Text style={styles.tagTxt}>Last Name:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={newLastName}
                onChangeText={setNewLastName}
              />
              <View style={styles.tag}>
                <Text style={styles.tagTxt}>Email:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
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

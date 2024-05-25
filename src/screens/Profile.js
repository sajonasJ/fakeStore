import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Modal, TextInput } from "react-native";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function Profile({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);

  const handleConfirm = () => {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setEmail(newEmail);
    setModalVisible(false);
    console.log("confirmed");
  };

  const handleCancel = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setNewEmail(email);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.infoBx}>
        <View style={styles.dBx}>
          <View style={styles.detailBx}>
            <Text style={styles.detailTxt}>Name:</Text>
          </View>
          <View style={styles.detailBx2}>
            <Text style={styles.detailTxt2}>{`${firstName} ${lastName}`}</Text>
          </View>
        </View>

        <View style={styles.dBx}>
          <View style={styles.detailBx}>
            <Text style={styles.detailTxt}>Email:</Text>
          </View>
          <View style={styles.detailBx2}>
            <Text style={styles.detailTxt2}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.optionBx}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("pressed logout");
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
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
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tagTxt:{
    fontSize:16,
    fontWeight:"bold",
  },
  tag:{

    width:"100%",
    // padding:10,
    paddingBottom:5,
    paddingLeft:10,
    paddingTop:10,

  },
  dBx: {
    // borderWidth: 1,
    backgroundColor:"#dee2e6"
  },
  infoBx: {
    margin: 15,
    width: "100%",
    padding: 15,
    gap: 15,
    
  },
  button: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
  },
  optionBx: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    justifyContent: "center",
    gap: "100%",
    flexDirection: "row",
  },
  detailBx: {
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight:15,

  },
  detailBx2: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight:15,
    alignItems: "center",
    justifyContent: "center",
  },
  detailTxt: {
    width: "100%",
    // borderWidth:1,
    fontSize:20,
    fontWeight:"bold",
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:5,
  },
  detailTxt2: {
    width: "100%",
    borderWidth:1,
    borderColor:"#adb5bd",
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:5,
    fontSize:20,
    backgroundColor:"white"
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
    backgroundColor: "white",
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
    backgroundColor:"#e9ecef",
  },
  modalButtonContainer: {
    marginTop:25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
  },
});

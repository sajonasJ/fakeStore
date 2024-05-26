import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert, FlatList, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";

export default function Orders({ navigation }) {
  const [showNewOrders, setShowNewOrders] = useState(false);
  const [showPaidOrders, setShowPaidOrders] = useState(false);
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
  const [orders, setOrders] = useState({
    newOrders: [
      { id: "1", number: 3, total: 100, image: "https://via.placeholder.com/50", title: "Product 1", quantity: 2 },
      { id: "2", number: 1, total: 50, image: "https://via.placeholder.com/50", title: "Product 2", quantity: 1 },
      { id: "3", number: 2, total: 75, image: "https://via.placeholder.com/50", title: "Product 3", quantity: 3 },
    ],
    paidOrders: [
      { id: "4", number: 2, total: 100, image: "https://via.placeholder.com/50", title: "Product 4", quantity: 2 },
      { id: "5", number: 3, total: 150, image: "https://via.placeholder.com/50", title: "Product 5", quantity: 3 },
      { id: "6", number: 1, total: 75, image: "https://via.placeholder.com/50", title: "Product 6", quantity: 1 },
    ],
    deliveredOrders: [
      { id: "7", number: 2, total: 100, image: "https://via.placeholder.com/50", title: "Product 7", quantity: 2 },
      { id: "8", number: 3, total: 150, image: "https://via.placeholder.com/50", title: "Product 8", quantity: 3 },
      { id: "9", number: 1, total: 75, image: "https://via.placeholder.com/50", title: "Product 9", quantity: 1 },
    ],
  });

  const toggleNewOrders = () => setShowNewOrders(!showNewOrders);
  const togglePaidOrders = () => setShowPaidOrders(!showPaidOrders);
  const toggleDeliveredOrders = () => setShowDeliveredOrders(!showDeliveredOrders);

  const handlePay = (id) => {
    setOrders((prevOrders) => {
      const newOrderList = prevOrders.newOrders.filter(order => order.id !== id);
      const paidOrder = prevOrders.newOrders.find(order => order.id === id);
      return {
        ...prevOrders,
        newOrders: newOrderList,
        paidOrders: [...prevOrders.paidOrders, paidOrder],
      };
    });
    Alert.alert("Payment Successful", `Order ${id} is now paid.`);
  };

  const handleReceive = (id) => {
    setOrders((prevOrders) => {
      const paidOrderList = prevOrders.paidOrders.filter(order => order.id !== id);
      const deliveredOrder = prevOrders.paidOrders.find(order => order.id === id);
      return {
        ...prevOrders,
        paidOrders: paidOrderList,
        deliveredOrders: [...prevOrders.deliveredOrders, deliveredOrder],
      };
    });
    Alert.alert("Order Received", `Order ${id} is now delivered.`);
  };

  const OrderItem = ({ order, status }) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    return (
      <View style={styles.orderItem}>
        <TouchableOpacity style={styles.orderHeader} onPress={toggleDetails}>
          <Text style={styles.hText}>Order ID: {order.id}</Text>
          <Text style={styles.hText}>Items: {order.number}</Text>
          <Text style={styles.hText}>Total: ${order.total}</Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.detail}>
            <View style={styles.productDetails}>
              <Image source={{ uri: order.image }} style={styles.productImage} />
              <View>
                <Text style={styles.genText}>{order.title}</Text>
                <Text style={styles.genText}>Quantity: {order.quantity}</Text>
              </View>
            </View>
            {status === "new" && (
              <TouchableOpacity style={styles.button} onPress={() => handlePay(order.id)}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
            {status === "paid" && (
              <TouchableOpacity style={styles.button} onPress={() => handleReceive(order.id)}>
                <Text style={styles.buttonText}>Receive</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderOrderSection = (title, orders, showOrders, toggleOrders, status) => (
    <View>
      <TouchableOpacity style={styles.statusHeader} onPress={toggleOrders}>
        <Text style={styles.statusHeaderText}>{title} ({orders.length})</Text>
        <Ionicons
          name={showOrders ? "caret-up-outline" : "caret-down-outline"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
      {showOrders && (
        <View>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} status={status} />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="My Orders" />
      <ScrollView contentContainerStyle={styles.cntner}>
        {renderOrderSection("New Orders", orders.newOrders, showNewOrders, toggleNewOrders, "new")}
        {renderOrderSection("Paid Orders", orders.paidOrders, showPaidOrders, togglePaidOrders, "paid")}
        {renderOrderSection("Delivered Orders", orders.deliveredOrders, showDeliveredOrders, toggleDeliveredOrders, "delivered")}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hText:{
    fontSize:16,
  },
  genText:{
    fontSize:18,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 170, 250, .5)',
    width: "100%",
  },
  statusHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderItem: {
    width: "100%",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap:"100%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: c.bkgcol,
  },
  detail: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: c.bkgcol,
    width: "100%",
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cntner: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
  },
});

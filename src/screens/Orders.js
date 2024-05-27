import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  selectOrders,
  selectAuth,
  updateOrder
} from "../reducers/authSlice";

export default function Orders({ navigation }) {
  const [showNewOrders, setShowNewOrders] = useState(false);
  const [showPaidOrders, setShowPaidOrders] = useState(false);
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
  const dispatch = useDispatch();
  const newOrders = useSelector(selectOrders);
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllOrders(user.token));
    }
  }, [user, dispatch]);

  const [orders, setOrders] = useState({
    newOrders: [],
    paidOrders: [],
    deliveredOrders: [],
  });

  useEffect(() => {
    if (newOrders) {
      const newOrderList = newOrders.map((order) => ({
        id: order.id,
        number: order.item_numbers,
        total: order.total_price / 100,
        order_items: JSON.parse(order.order_items),
        is_paid: order.is_paid,
        is_delivered: order.is_delivered,
      }));

      setOrders({
        newOrders: newOrderList.filter(order => order.is_paid === 0),
        paidOrders: newOrderList.filter(order => order.is_paid === 1 && order.is_delivered === 0),
        deliveredOrders: newOrderList.filter(order => order.is_delivered === 1),
      });
    }
  }, [newOrders]);

  const toggleNewOrders = () => setShowNewOrders(!showNewOrders);
  const togglePaidOrders = () => setShowPaidOrders(!showPaidOrders);
  const toggleDeliveredOrders = () => setShowDeliveredOrders(!showDeliveredOrders);

  const handlePay = (id) => {
    dispatch(updateOrder({ orderID: id, isPaid: 1, isDelivered: 0 }))
      .unwrap()
      .then((response) => {
        if (response.status === "OK") {
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
        } else {
          Alert.alert("Error", response.message);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleReceive = (id) => {
    dispatch(updateOrder({ orderID: id, isPaid: 1, isDelivered: 1 }))
      .unwrap()
      .then((response) => {
        if (response.status === "OK") {
          setOrders((prevOrders) => {
            const paidOrderList = prevOrders.paidOrders.filter(order => order.id !== id);
            const deliveredOrder = prevOrders.paidOrders.find(order => order.id === id);
            return {
              ...prevOrders,
              paidOrders: paidOrderList,
              deliveredOrders: [...prevOrders.deliveredOrders, deliveredOrder],
            };
          });
          Alert.alert("Order Delivered", `Order ${id} is now delivered.`);
        } else {
          Alert.alert("Error", response.message);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const OrderItem = ({ order, status }) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    return (
      <View style={styles.orderItem}>
        <TouchableOpacity style={styles.orderHeader} onPress={toggleDetails}>
          <Text style={styles.hText}>Order ID: {order.id}</Text>
          <Text style={styles.hText}>Items: {order.number}</Text>
          <Text style={styles.hText}>Total: ${order.total.toFixed(2)}</Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.detail}>
            <View style={styles.productDetails}>
              {order.order_items.map((item, index) => (
                <View key={index} style={styles.productDetailItem}>
                  <View>
                    <View style={styles.ordBx}>
                      <Image
                        source={{ uri: "https://via.placeholder.com/50" }}
                        style={styles.productImage}
                      />
                      <View style={styles.ordBx2}>
                        <Text style={styles.genText}>Product ID: {item.prodID}</Text>
                        <Text style={styles.genText}>Price: ${item.price.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.genText}>Quantity: {item.quantity}</Text>
                  </View>
                </View>
              ))}
            </View>
            {status === "new" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePay(order.id)}
              >
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
            {status === "paid" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReceive(order.id)}
              >
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
        <Text style={styles.statusHeaderText}>
          {title} ({orders.length})
        </Text>
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
        {renderOrderSection(
          "New Orders",
          orders.newOrders || [],
          showNewOrders,
          toggleNewOrders,
          "new"
        )}
        {renderOrderSection(
          "Paid Orders",
          orders.paidOrders,
          showPaidOrders,
          togglePaidOrders,
          "paid"
        )}
        {renderOrderSection(
          "Delivered Orders",
          orders.deliveredOrders,
          showDeliveredOrders,
          toggleDeliveredOrders,
          "delivered"
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  ordBx2: {
    flexDirection: "column",
  },
  ordBx: {
    flexDirection: "row",
  },
  productDetailItem: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    width: "100%",
    borderColor: 'lightgray',
    justifyContent: "space-between",
  },
  hText: {
    fontSize: 16,
  },
  genText: {
    fontSize: 16,
    padding:5,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "rgba(0, 170, 250, .5)",
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
    justifyContent: "space-between",
    alignItems: "center",
    // gap:5,
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
    flexDirection: "column",
    alignItems: "flex-start",
    // marginTop: 10,
    width: "100%",
    gap: 5,
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

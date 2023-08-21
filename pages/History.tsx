import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
 

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const paymentData = await AsyncStorage.getItem('paymentData');
        const paymentTitle = await AsyncStorage.getItem('paymentTitle');
        if (paymentData) {
          const parsedPaymentData = JSON.parse(paymentData);
          setPaymentHistory(prevHistory => [
            ...prevHistory,
            { ...parsedPaymentData, title: paymentTitle } 
          ]);
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };
    
    fetchPaymentHistory();
  }, []);
  


  const sortedPaymentHistory = paymentHistory.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
  data={sortedPaymentHistory}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.paymentItem}>
      <Text>Title: {item.title}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Type: {item.type}</Text>
      {item.type === "Recursive" && (
        <Text>Duration: {item.duration} months</Text>
      )}
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  paymentItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default History;

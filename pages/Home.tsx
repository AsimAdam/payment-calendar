import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddPayment from "./AddPayment";




const Home = () => {
  const navigation: any = useNavigation();
  const [paymentTitle, setPaymentTitle] = useState<any>(""); 
  const handleConfirm = () => {
    console.log('paymentTitle:', paymentTitle);
    navigation.navigate("AddPayment", { paymentTitle });
  }
  
  
  return (
    <View style={styles.container}>
      <Image source={require("../assets/favicon.png")} style={{width: 70, height: 70, alignSelf: "center", marginBottom: 10}} resizeMode="contain" />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Welcome to your personal payments calendar add your payments and appoinments now and get notified with the time and status of your payments</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your payments here"
        placeholderTextColor={'grey'}
        value={paymentTitle}
        onChangeText={setPaymentTitle} 
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  input: { 
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.9,
    height: 50,
    borderRadius: 10,
    padding: 10
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.9,
    height: 30,
    alignItems: 'center',
    marginTop: 15
  }
})

export default Home;

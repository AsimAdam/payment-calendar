import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddPayment = ({ route }) => {
    const { paymentTitle } = route.params;
    const [showDatePicker, setShowDatePicker] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [paymentType, setPaymentType] = useState(0);
    const [amountValue, setAmountValue] = useState("");
    const [selectedType, setSelectedType] = useState(0);
    const [isRecursive, setIsRecursive] = useState(false);
    const [duration, setDuration] = useState("");
    
    const handleAmountChange = useCallback((value) => {
        setAmountValue(value);
      }, []);

      const handleSave = async () => {
        const selectedPaymentType = paymentTypes.find(type => type.value === paymentType);
        if (selectedPaymentType) {
          const paymentData = {
            amount: amountValue,
            date: selectedDate.toISOString(),
            type: selectedPaymentType.label,
            duration: isRecursive ? duration : null,
          };
      
          try {
            await AsyncStorage.setItem('paymentData', JSON.stringify(paymentData));
            console.log('Payment data saved to AsyncStorage:', paymentData);
          } catch (error) {
            console.error('Error saving payment data to AsyncStorage:', error);
          }
        }
      };
        useEffect(() => {
            
            const fetchSavedPaymentData = async () => {
              try {
                const savedPaymentData = await AsyncStorage.getItem('paymentData');
                if (savedPaymentData) {
                  const parsedPaymentData = JSON.parse(savedPaymentData);
                  setAmountValue(parsedPaymentData.amount);
                  setSelectedDate(new Date(parsedPaymentData.date));
                  setSelectedType(parsedPaymentData.type);
                  console.log('Payment data retrieved from AsyncStorage:', parsedPaymentData);
                }
              } catch (error) {
                console.error('Error retrieving payment data from AsyncStorage:', error);
              }
            };
            fetchSavedPaymentData();
          }, []);
          
  const paymentTypes = [
    { label: 'Recursive', value: 0 },
    { label: 'One-time Pyment', value: 1 },
    
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter {paymentTitle} Details</Text>

      <View style={styles.formGroup}>
        <Text>Amount:</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amountValue} 
        onChangeText={handleAmountChange} 
        />

      </View>

      <TouchableOpacity
            style={styles.formGroup}
            onPress={() => setShowDatePicker(true)}
            >
            <View style={styles.datePickerRow}>
                <Ionicons name="md-calendar" size={20} color="#000" style={styles.datePickerIcon} />
                <Text>Select Date:</Text>
            </View>
            {showDatePicker && (
                <DateTimePicker
                value={selectedDate}
                mode="date"
                onChange={(event, date) => {
                    setShowDatePicker(false);
                    setSelectedDate(date);
                }}
                />
            )}
            </TouchableOpacity>


            <View style={styles.formGroup}>
  <Text>Select Payment Type:</Text>
  <RadioForm formHorizontal={true} animation={true}>
    {paymentTypes.map((type, index) => (
      <RadioButton labelHorizontal={true} key={index}>
        <RadioButtonInput
          obj={type}
          index={index}
          isSelected={paymentType === index}
          onPress={() => {
            setPaymentType(index);
            setIsRecursive(type.value === 0);
          }}
          borderWidth={1}
          buttonInnerColor={'#2196f3'}
          buttonOuterColor={paymentType === index ? '#2196f3' : '#000'}
          buttonSize={15}
          buttonOuterSize={25}
          buttonStyle={{}}
          buttonWrapStyle={{ marginLeft: 10 }}
        />
        <RadioButtonLabel
          obj={type}
          index={index}
          labelHorizontal={true}
          onPress={() => {
            setPaymentType(index);
            setIsRecursive(type.value === 0);
          }}
          labelStyle={{ fontSize: 16, color: '#000' }}
          labelWrapStyle={{}}
        />
      </RadioButton>
    ))}
  </RadioForm>
</View>
{isRecursive && (
  <View style={styles.formGroup}>
    <Text>Duration (months):</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter duration"
      value={duration}
      onChangeText={setDuration}
    />
  </View>
)}


      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerIcon: {
    marginRight: 10,
  },
});

export default AddPayment;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import MyCalendar from './pages/Calendar';
import History from './pages/History';
import AddPayment from './pages/AddPayment';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="MyCalendar"
          component={MyCalendar}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-calendar" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-time" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

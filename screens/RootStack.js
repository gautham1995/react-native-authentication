import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';


const Rstack = createNativeStackNavigator();

const RootStack = ({navigation}) => {
  return (
      <Rstack.Navigator>
        <Rstack.Screen name="Login" component={LoginScreen} />
      </Rstack.Navigator>
  )
}

export default RootStack
import React,{useState, useEffect, useMemo, createContext, useContext} from 'react'
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from "react-native";
import { AuthContext } from './Context'

import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {

  const {logOut} = useContext(AuthContext);

  const [uname, setUname] = useState("temp")
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken')
      setUname = value
      if(value !== null) {
        // value previously stored
        console.log(value)
        
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  return (
    <SafeAreaView>
      <Text>
        user name is: {uname}
      </Text>
      <Button
        title="name"
        onPress={() => {
          getData()
        }}
      />
<br/>
    <Button
        title="Logout"
        onPress={() => {logOut()}}
      />
  </SafeAreaView>
  )
}

export default HomeScreen
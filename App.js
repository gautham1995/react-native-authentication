import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useReducer,
} from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RootStack from "./screens/RootStack";
import { AuthContext } from "./screens/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  // const [userToken, setUserToken] = useState(null)

  const intialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false 
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false 
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,          
          isLoading: false 
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, intialLoginState)

  const authContext = useMemo(
    () => ({
      logIn: async(userName, password) => {
        let userToken;
        userToken = null;
        if(userName == '1149' && password == 'pass'){
          try {
            userToken = 'sdf';
            await AsyncStorage.setItem('userToken', userToken)
          } catch (error) {
            console.log(error)
          }
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken})
      },
      logOut: async() => {
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (error) {
          console.log(error)
        }
        dispatch({type: 'LOGOUT'})
      },
    }),
    []
  ); 
  // empty array - this makes, not to run this everytime we render our screen

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
        userToken = null;

        try {
          userToken = await AsyncStorage.getItem('userToken')
        } catch (error) {
          console.log(error)
        }


      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        ) : (
          <RootStack />
        )}
        {/*<RootStack/>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

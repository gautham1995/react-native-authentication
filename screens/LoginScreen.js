import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import { AuthContext } from "./Context";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const LoginScreen = () => {
  const [name, setName] = useState("hahaha");
  const [password, setPassword] = useState("qwww");

  const { logIn } = useContext(AuthContext);

  const loginHandle = (username, password) => {
    logIn(username, password);
    console.log(username + " " + password);
  };

  return (
    <SafeAreaView>
      <TextInput onChangeText={setName} value={name} placeholder="name" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button
        title="Login"
        onPress={() => {
          loginHandle(name, password);
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

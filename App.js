import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  Keyboard,
} from "react-native";

export default function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [input, setInput] = useState({
  //   email: "",
  //   password: "",
  // });

  const [input, setInput] = useState({
    values: { email: "", password: "" },
    validities: { email: false, password: false },
    isFormValid: false,
  });

  // const inputHandler = (id, value) => {
  //   setInput((prevInput) => ({ ...prevInput, [id]: value }));
  // };

  const inputHandler = (id, value) => {
    const text = value.trim();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true,
      isFormValid = true;
    // if (text.length < 4) {
    //   isValid = false;
    // }

    if (id === "email" && !emailRegex.test(text)) {
      isValid = false;
    }

    if (id === "password" && text.length < 4) {
      isValid = false;
    }

    setInput((prevInput) => {
      const validities = { ...prevInput.validities, [id]: isValid };

      for (let key in validities) {
        isFormValid = isFormValid && validities[key];
      }

      return {
        ...prevInput,
        values: { ...prevInput.values, [id]: text },
        // validities: { ...prevInput.validities, [id]: isValid },
        validities,
        isFormValid,
      };
    });
  };

  const loginHandler = () => {
    // if (!input.email || !input.password) {
    if (!input.isFormValid) {
      Alert.alert("Error", "check form for errors", [{ text: "ok" }]);
      return;
    }
    Keyboard.dismiss();
    console.log(input);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        translucent
        barStyle="dark-content"
        backgroundColor="rgba(0,0,0,0.3)"
      />
      <Text style={styles.formTitle}>RNAuthentication</Text>
      <View style={styles.form}>
        <Text>Email</Text>
        <TextInput
          placeholder="Enter Your email"
          style={styles.input}
          value={input.email}
          onChangeText={(text) => inputHandler("email", text)}
          // onChangeText={(text) =>
          //   setInput((prev) => ({ ...prev, email: text }))
          // }
        />
        {!input.validities.email && <Text>Invalid Email</Text>}
        <Text>Password</Text>
        <TextInput
          placeholder="Enter Your password"
          style={styles.input}
          value={input.password}
          onChangeText={(text) => inputHandler("password", text)}
          secureTextEntry
          onSubmitEditing={loginHandler}
        />
        {!input.validities.password && <Text>Invalid Password</Text>}
        <Button title="Login" onPress={loginHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 20,
    color: "#888",
  },
  form: {
    height: 200,
    width: "70%",
    justifyContent: "space-around",
  },
  input: {
    height: 40,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});

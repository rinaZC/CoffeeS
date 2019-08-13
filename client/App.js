import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import styles from "./styles";
import Login from "./screens/login";
import Register from "./screens/register";
import Main from "./screens/main";
import Questionary from "./screens/questionary";

const AppNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Main: Main,
  Questionary: Questionary

},
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);



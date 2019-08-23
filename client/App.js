import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import styles from "./styles";
import Login from "./screens/login";
import Register from "./screens/register";
import Main from "./screens/main";
import Questionary from "./screens/questionary";
import UpdateProfile from "./screens/updateProfile";
import ManageReview from "./screens/manageReviews";
import Wishlist from "./screens/wishList";


const AppNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Main: Main,
  Questionary: Questionary,
  UpdateProfile: UpdateProfile,
  ManageReview: ManageReview,
  Wishlist: Wishlist


},
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);



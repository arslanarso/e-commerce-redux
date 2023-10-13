import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import BottomTabNav from "./BottomTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./authStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../../Redux/authReducer";
import LoadingScreen from "../components/Loading/Loading";

const Root = createStackNavigator();

/**
 * The main Router component that handles navigation based on authentication state.
 */
const Router: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const authData = await AsyncStorage.getItem("auth");
        if (authData !== null) {
          const parsedAuthData = JSON.parse(authData);
          if (parsedAuthData.isAuthenticated) {
            dispatch(login(parsedAuthData.user));
          } else {
            dispatch(logout());
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("AsyncStorage Error:", error);
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={screenOptions}>
        <Root.Screen
          component={
            isLoading
              ? LoadingScreen
              : isAuthenticated
              ? BottomTabNav
              : AuthStack
          }
          name="HomeTabs"
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

// Configuration options for the stack navigator.
const screenOptions = {
  headerShown: false,
};

export default Router;

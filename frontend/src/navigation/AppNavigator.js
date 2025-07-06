import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { AuthContext } from "../services/AuthContext";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Accueil" component={HomeScreen} />
            {/* Autres écrans privés à venir */}
          </>
        ) : (
          <>
            <Stack.Screen name="Connexion" component={LoginScreen} />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

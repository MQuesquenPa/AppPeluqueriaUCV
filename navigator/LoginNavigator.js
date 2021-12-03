import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { InicioScreen } from '../screens/InicioScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';

const Stack = createStackNavigator();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator     
      screenOptions={{
        headerShown: false
      }} 
    >
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="RegistroScreen" component={ RegistroScreen } />
      <Stack.Screen name="InicioScreen" component={ InicioScreen } />

    </Stack.Navigator>
  );
}
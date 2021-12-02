import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MasScreen } from '../screens/MasScreen';
import { NosotrosScreen } from '../screens/NosotrosScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { ReservasAllScreen } from '../screens/ReservasAllScreen';
import { ReservaScreen } from '../screens/ReservaScreen';
// import { RegistroScreen } from '../screens/RegistroScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator     
      screenOptions={{
        headerShown: false
      }} 
    >

      <Stack.Screen name="HomeScreen" headerMode={'none'}  options={{title: 'Home' }}    component={ HomeScreen } />

      <Stack.Screen name="LoginScreen" component={ LoginScreen } />

      <Stack.Screen name="MasScreen" headerMode={'true'}   component={ MasScreen } />
      <Stack.Screen name="NosotrosScreen" component={ NosotrosScreen } />

      <Stack.Screen name="PerfilScreen" component={ PerfilScreen } />
      <Stack.Screen name="ReservasAllScreen" component={ ReservasAllScreen } />
      <Stack.Screen name="ReservaScreen" component={ ReservaScreen } />
      {/* <Stack.Screen name="RegistroScreen" component={ RegistroScreen } /> */}


 
    </Stack.Navigator>
  );
}
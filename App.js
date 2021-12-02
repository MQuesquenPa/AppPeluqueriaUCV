import React from 'react'


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// import { StackNavigator } from './navigator/StackNavigator';
import { MenuLateral } from './navigator/MenuLateral';
import { LoginScreen } from './screens/LoginScreen';
import { LoginNavigator } from './navigator/LoginNavigator';

const App = () => {
  return (
    <>
    
    <NavigationContainer >
      <LoginNavigator />
      {/* <MenuLateral /> */}
    </NavigationContainer>
    </>
  )
}


export default App;
import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '../navigator/StackNavigator';
import { MenuLateral } from '../navigator/MenuLateral';


export const InicioScreen = () => {
    return (
        <>
            <NavigationContainer independent={true} >
            <MenuLateral />
            </NavigationContainer>  
        </>
    )
}

import React from 'react'


import { ProductosAllScreen } from '../screens/ProductosAllScreen';
import { ProductoScreen } from '../screens/ProductoScreen';

export const ProductosNavigator = () => {
    return (
        <>
            <Stack.Navigator     
            screenOptions={{
                headerShown: false
            }} 
            >

          
            <Stack.Screen name="ProductoScreen" component={ ProductoScreen } />
            <Stack.Screen name="ProductosAllScreen" component={ ProductosAllScreen } />


 
            </Stack.Navigator>
        </>
    )
}

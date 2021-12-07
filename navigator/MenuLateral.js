import React from 'react'
import { Image, Text, useWindowDimensions, View } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';


import { PeluqueroScreen } from '../screens/PeluqueroScreen';
import { styles } from '../theme/appTheme';
import {useNavigation} from "@react-navigation/native";
import { PeluquerosAllScreen } from '../screens/PeluquerosAllScreen';
import { ClientesAllScreen } from '../screens/ClientesAllScreen';

import { TabScreens } from './TabScreens';


const Drawer = createDrawerNavigator();


export function MenuLateral() {

    const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerType = "permanent"
        drawerContent = {() => <MenuInterno />}
    >
      <Drawer.Screen name="TabScreens"  component={TabScreens} />
      <Drawer.Screen name="PeluquerosAllScreen" component={PeluquerosAllScreen} />
      <Drawer.Screen name="ClientesAllScreen" component={ClientesAllScreen} />
    </Drawer.Navigator>
  );
}

const MenuInterno = () =>{
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView>
      <View style = { styles.containerAvatar }>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/1024px-Avatar_icon_green.svg.png'
        }}
        style={ styles.avatar }
        />
      </View>

        {/* opciones de menu */}
      <View style={styles.menuContainer}>
        
        <TouchableOpacity 
          style={{
            ...styles.menuBoton,
            flexDirection : 'row',
            
          }}
          onPress = { () => navigation.navigate( 'PeluquerosAllScreen' ) }
        >
          <Icon name={'person-circle-outline'} size={ 25 } color= { 'black'} />  
          <Text style={styles.menuText}>Peluquero</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            ...styles.menuBoton,
            flexDirection: 'row'
          }}
          onPress = { () => navigation.navigate( 'ClientesAllScreen' ) }
        >
          <Icon name={'happy-outline'} size={ 25 } color= { 'black'} />  
          <Text style={styles.menuText}>Clientes</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity 
          style={{
            ...styles.menuBoton,
            flexDirection: 'row'
          }}
          onPress = { () => navigation.navigate( 'StackNavigator' ) }
        >
          <Icon name={'construct-outline'} size={ 25 } color= { 'black'} />  
          <Text  style={styles.menuText}>Mantenimiento</Text>
        </TouchableOpacity> */}
      </View>
    </DrawerContentScrollView>
  );
}
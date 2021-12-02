import React from 'react'
import { Image, Text, useWindowDimensions, View } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';


import { PeluqueroScreen } from '../screens/PeluqueroScreen';
import { styles } from '../theme/appTheme';
import {useNavigation} from "@react-navigation/native";
import { ClienteScreen } from '../screens/ClienteScreen';
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
      <Drawer.Screen name="PeluqueroScreen" component={PeluqueroScreen} />
      <Drawer.Screen name="ClienteScreen" component={ClienteScreen} />
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
          onPress = { () => navigation.navigate( 'PeluqueroScreen' ) }
        >
          <Icon name={'person-circle-outline'} size={ 25 } color= { 'black'} />  
          <Text style={styles.menuText}>Peluquero</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            ...styles.menuBoton,
            flexDirection: 'row'
          }}
          onPress = { () => navigation.navigate( 'ClienteScreen' ) }
        >
          <Icon name={'happy-outline'} size={ 25 } color= { 'black'} />  
          <Text style={styles.menuText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            ...styles.menuBoton,
            flexDirection: 'row'
          }}
          onPress = { () => navigation.navigate( 'StackNavigator' ) }
        >
          <Icon name={'construct-outline'} size={ 25 } color= { 'black'} />  
          <Text  style={styles.menuText}>Mantenimiento</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


// import { StackNavigator } from './StackNavigator';
import { StackNavigator } from './StackNavigator';

import { ProductosAllScreen } from '../screens/ProductosAllScreen';
// import { ReservaScreen } from '../screens/ReservaScreen';
import { ReservasAllScreen } from '../screens/ReservasAllScreen';

import { MasScreen } from '../screens/MasScreen';

import { Filtro } from '../components/Filtro';
import { colores } from '../theme/appTheme';

const Tab = createMaterialBottomTabNavigator();

export const  TabScreens = () => {
  return (
    <Tab.Navigator
    headerMode={'none'} 
    sceneAnimationEnabled= {true} 
    barStyle = {{
      backgroundColor: colores.primary
    }}
    // sceneContainerStyle = {{
    //   backgroundColor: 'white'
    // }}
      TabBarOptions = {{
        
        activeTintColor: colores.primary,
        style :{
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0
        }
      }}
      screenOptions = {({ route })=> ({
        tabBarIcon: ( { color, focused} ) => {
          let iconName;
          switch(route.name){
            // case 'StackNavigator':
            //   iconName = 'home-outline'
            // break;
            case 'StackNavigator':
              iconName = 'home-outline'
            break;
            case 'ReservasAllScreen':
              iconName = 'calendar-outline'
            break;
            // case 'ReservaScreen':
            //   iconName = 'calendar-outline'
            // break;
            case 'Filtro':
              iconName = 'camera-outline'
            break;
            case 'ProductosAllScreen':
              iconName = 'basket-outline'
            break;
            case 'MasScreen':
              iconName = 'information-circle-outline'
            break;
          }
          return <Icon name={iconName} size={ 25 } color= { '#fff'}/>
        }
      })}
    >
      
      {/* <Tab.Screen name="StackNavigator" options={{title: 'Home', tabBarIcon: (props) => <Text style = {{color: props.color}}>T1</Text> }}  component={StackNavigator} /> */}
      {/* <Tab.Screen name="StackNavigator" screenOptions={{ headerShown: true }} options={{title: 'Home' }}  component={StackNavigator} /> */}
      <Tab.Screen name="StackNavigator" screenOptions={{ headerShown: true }} options={{title: 'Home' }}  component={StackNavigator} />

      <Tab.Screen name="ReservasAllScreen"  options={{title: 'Reservas'}} component={ReservasAllScreen} />
      
      {/* <Tab.Screen name="ReservaScreen"  options={{title: 'Reservas'}} component={ReservaScreen} /> */}

      <Tab.Screen name="Filtro" options={{title: ''}} component={Filtro} />
      <Tab.Screen name="ProductosAllScreen" options={{title: 'Productos'}} component={ProductosAllScreen} />
      <Tab.Screen name="MasScreen" headerMode={'true'}  options={{title: 'Mas'}} component={MasScreen} />
    </Tab.Navigator>
  );
}
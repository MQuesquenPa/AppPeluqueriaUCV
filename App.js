import React, {useState, useEffect} from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {  View, Text, Image} from 'react-native'


import { MenuLateral } from './navigator/MenuLateral';
import { LoginScreen } from './screens/LoginScreen';
import { LoginNavigator } from './navigator/LoginNavigator';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';

const App = () => {
  

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch ( action.type){
      case 'RETRIEVE_TOKEN' :
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      
      case 'LOGIN' :
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      
      case 'LOGOUT' :
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER' :
          return {
            ...prevState,
            isLoading: false,
          };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)


  const authContext = React.useMemo(() => ({
    signIn: async(dataId) => {
        try{
          await AsyncStorage.setItem('userToken', dataId)
        }catch(e){
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: "1", token: dataId});
    },
    signOut: async() => {
        try{
          await AsyncStorage.removeItem('userToken');
        }
        catch(e){
          console.log(e);
        }
        dispatch({ type: 'LOGOUT'});

    }
  }));

  useEffect(() => {
    setTimeout(async() =>{
        // setIsLoading(false);
        
        let userToken;
        userToken = null;
        try{
          userToken = await AsyncStorage.getItem('userToken');
        }
        catch(e){
          console.log(e);
        }

        console.log('user token: ', userToken);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

    }, 1000)
  }, [])

  // if(loginState.isLoading){
    if(loginState.isLoading){
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
          {/* <ActivityIndicator animating={true} color={Colors.red800} /> */}
          <ActivityIndicator animating={true} color={'red'} />

          <Text>CARGANDO</Text>
        </View>
      );
    }  
    
    return (
      <>

        <AuthContext.Provider value={authContext}>
          <NavigationContainer >
          {loginState.userToken  ? 
              <MenuLateral />
            :
            <LoginNavigator />
          }
          </NavigationContainer>        
        </AuthContext.Provider>
      </>
    )
  // }

}

export default App;

//   <NavigationContainer >
//   <LoginNavigator />
//     {/* <MenuLateral /> */}
// </NavigationContainer>

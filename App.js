import React, {useState, useEffect} from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {  View, Text} from 'react-native'

import { MenuLateral } from './navigator/MenuLateral';
import { LoginScreen } from './screens/LoginScreen';
import { LoginNavigator } from './navigator/LoginNavigator';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  
  // const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(false);

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
    signIn: async(userName, password) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        console.log(userName, password);

        let userToken;
        userToken = null;
        if( userName === 'user' && password === 'pass') {
          try{
            userToken = 'dfgdfg';
            await AsyncStorage.setItem('userToken', userToken)
          }
          catch(e){
            console.log(e);
          }
          
        }
        else{
          console.log('2');
        }
        console.log('user token: ', userToken);
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try{
          await AsyncStorage.removeItem('userToken');
        }
        catch(e){
          console.log(e);
        }
        dispatch({ type: 'LOGOUT'});

    },
    signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
    }
  }));

  useEffect(() => {
    setTimeout(async() =>{
        // setIsLoading(false);
        
        let userToken;
        userToken = null;
        try{
          userToken = await AsyncStorage.getItem('userToken')

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
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Text>CARGANDO</Text>
      </View>);
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
              
            {/* <MenuLateral /> */}
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

import React,{useState, useMemo, useContext} from 'react'
import { useNavigation } from '@react-navigation/core'
import { ScrollView, Keyboard, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import { LogoLogin } from '../components/LogoLogin';
import { loginStyle } from '../theme/loginTheme';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../components/context';
import apiCall from '../services/api';

export const LoginScreen = ({route, navigation}) => {
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const { signIn } = useContext(AuthContext);


    const loginHandle=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'join-usuario-data';
            let dataResponse = await apiCall('POST', url,{correo:email,password:password}, head);
            if(dataResponse.data.status=="success"){
                signIn(dataResponse.data.data._id);
            }else{
                console.log("error usuario incorrecto");
            }
        }catch(e){
            console.log(e);
        }
    }
    
    return (
        <>
        <KeyboardAvoidingView  style={{flex:1}}>
            <ScrollView style={loginStyle.fondo} >
                <LogoLogin />
                
                <View style={loginStyle.formulario}>

                    {/* <Text style={loginStyle.title} >
                        LOGIN
                    </Text> */}
                    {/* <Text style={loginStyle.label} >
                        EMAIL:
                    </Text> */}
                    <TextInput
                            mode='outlined'
                            label="Email"
                            placeholder="Ingrese el correo electronico"
                            style={loginStyle.cajaTexto}
                            keyboardType="email-address"
                            onChangeText={(email)=> setEmail(email)}
                            // onChangeText={(value)=> onChange(value, 'email')}
                            value={ email }
                            // onSubmitEditing = {onLogin}

                    />

                    <TextInput
                            secureTextEntry={true}
                            mode='outlined'
                            label="Contraseña"
                            placeholder="Ingrese la contraseña"
                            style={loginStyle.cajaTexto}
                            onChangeText={(password)=> setPassword(password)}
                            // onChangeText={(value)=> onChange(value, 'password')}
                            value={ password }
                            // onSubmitEditing = {onLogin}
                    />

                    <View>
                        <TouchableOpacity 
                        style={loginStyle.botonAceptar}
                        onPress={() => {loginHandle()}}
                        // onPress={() => navigation.replace( 'InicioScreen' )}

                        >
                        <Text style={loginStyle.textoboton}>Inicio Sesion</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={loginStyle.botonAceptar}
                            onPress={() => navigation.navigate( 'RegistroScreen' )}
                        >
                            <Text style={loginStyle.textoboton}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>          
        </>
    )
}


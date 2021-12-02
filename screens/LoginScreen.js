import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, Keyboard, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import { LogoLogin } from '../components/LogoLogin';
import { loginStyle } from '../theme/loginTheme';
import { TextInput } from 'react-native-paper';
import { useForm}  from '../hooks/useForm';

export const LoginScreen = ({route, navigation}) => {
    
    // const params = route.params;
    const {email, password, onChange} = useForm ({
        email: '',
        password: '',
    })

    const onLogin = () => {
        console.log({email, password});
        Keyboard.dismiss();
    }

    const navigator = useNavigation();
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
                            onChangeText={(value)=> onChange(value, 'email')}
                            value={ email }
                            onSubmitEditing = {onLogin}

                    />

                    <TextInput
                            secureTextEntry={true}
                            mode='outlined'
                            label="Contraseña"
                            placeholder="Ingrese la contraseña"
                            style={loginStyle.cajaTexto}
                            onChangeText={(value)=> onChange(value, 'password')}
                            value={ password }
                            onSubmitEditing = {onLogin}
                    />

                    <View>
                        <TouchableOpacity 
                        style={loginStyle.botonAceptar}
                        onPress={onLogin}
                        >
                        <Text style={loginStyle.textoboton}>Inicio Sesion</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={loginStyle.botonAceptar}
                            onPress={() => navigation.replace( 'RegistroScreen' )}
                        >
                            <Text style={loginStyle.textoboton}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>



            {/* <View style={styless.texto}>
                <Text  style={styless.titulo}>Login</Text>
                <Text  style={styless.titulo}>
                    {params.nombre}
                    {
                        JSON.stringify(params, null, 3)
                    } 
            </Text>
          
                <Button
                title= "ir a pagina 3"
                onPress={() => navigator.navigate('MasScreen') }
                />
            </View> */}
            
        </>
    )
}


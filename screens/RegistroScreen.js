import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { ScrollView, Keyboard, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { LogoLogin } from '../components/LogoLogin';
import { TextInput } from 'react-native-paper';
import { loginStyle } from '../theme/loginTheme';
import { useForm}  from '../hooks/useForm';

export const RegistroScreen = ({navigation}) => {
    
    const {nombre, email, password, onChange} = useForm ({
        nombre: '',
        email: '',
        password: '',
    })

    const onRegister = () => {
        console.log({nombre, email, password});
        Keyboard.dismiss();
    }
    
    const navigator = useNavigation();
    return (
        <>
        <KeyboardAvoidingView  style={{flex:1}}>
            <ScrollView style={loginStyle.fondo} >
                <LogoLogin />
                <View style={loginStyle.formulario}>

                  <Text>REGISTRO</Text>
                    <TextInput
                            mode='outlined'
                            label="Nombre"
                            placeholder="Ingrese el Nombre"
                            style={loginStyle.cajaTexto}
                            onChangeText={(value)=> onChange(value, 'nombre')}
                            value={ nombre }
                            onSubmitEditing = {onRegister}
                            autoCapitalize = 'words'
                            autoCorrect = {false}
                    />
                    <TextInput
                            mode='outlined'
                            label="Email"
                            placeholder="Ingrese el correo electronico"
                            style={loginStyle.cajaTexto}
                            keyboardType="email-address"
                            onChangeText={(value)=> onChange(value, 'email')}
                            value={ email }
                            onSubmitEditing = {onRegister}
                            autoCorrect = {false}
                    />

                    <TextInput
                            secureTextEntry={true}
                            mode='outlined'
                            label="Contraseña"
                            placeholder="Ingrese la contraseña"
                            style={loginStyle.cajaTexto}
                            onChangeText={(value)=> onChange(value, 'password')}
                            value={ password }
                            onSubmitEditing = {onRegister}
                            autoCorrect = {false}
                    />

                    <View>
                        <TouchableOpacity 
                        style={loginStyle.botonAceptar}
                        onPress={onRegister}
                        >
                        <Text style={loginStyle.textoboton}>Crear Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={loginStyle.botonAceptar}
                            onPress={() => navigation.replace( 'LoginScreen' )}
                        >
                            <Text style={loginStyle.textoboton}>Regresar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        </>
    )
}

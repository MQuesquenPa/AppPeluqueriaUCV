import { useNavigation } from '@react-navigation/core'
import React,{useState, useMemo} from 'react'
import { ScrollView, Keyboard, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import { LogoLogin } from '../components/LogoLogin';
import { loginStyle } from '../theme/loginTheme';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../components/context';

export const LoginScreen = ({route, navigation}) => {
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const { signIn } = React.useContext(AuthContext);

    const onLogin = () => {
        console.log({email, password});
        Keyboard.dismiss();
        signIn();
    }

    const onChange=()=>{
        console.log("test");
    }

    const navigator = useNavigation();

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        if( val.trim().length === 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                // isValidUser: true 
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                // isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
                ...data,
                password: val,
                // isValidPassword: true
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = () => {
        
        signIn(email, password);
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


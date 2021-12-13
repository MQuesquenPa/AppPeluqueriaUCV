import React,{useState,useContext} from 'react';
import { ScrollView,  Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import apiCall from '../services/api';
import { AuthContext } from '../components/context';
import { LogoLogin } from '../components/LogoLogin';
import { loginStyle } from '../theme/loginTheme';

export const RegistroScreen = ({navigation}) => {
    const { signIn } = useContext(AuthContext);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    
    const postDataUsuario=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let dato={nombre:nombre, correo:email, password:password}
            const dataResponse = await apiCall('POST','new-usuario-data',dato,head);          
            if(dataResponse.data.status=="success"){
                signIn(dataResponse.data.data._id);
            }else{
                alert('NO se registro usuario');
                console.log("error");
                console.log(dataResponse.data);
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
                    <TouchableOpacity 
                            style={loginStyle.btnVolver}
                            onPress={() => navigation.replace( 'LoginScreen' )}
                    >
                        <Icon name={'chevron-back-outline'} size={ 22 } color= { '#030099'} />
                        <Text style={loginStyle.textoBtn}>volver</Text>
                    </TouchableOpacity>
                <View style={loginStyle.formulario}>

                  <Text>REGISTRO</Text>
                    <TextInput
                            mode='outlined'
                            label="Nombre"
                            placeholder="Ingrese el Nombre"
                            style={loginStyle.cajaTexto}
                            onChangeText={nombre => setNombre(nombre)}
                            value={ nombre }
                            // onSubmitEditing = {onRegister}
                            autoCapitalize = 'words'
                            autoCorrect = {false}
                    />
                    <TextInput
                            mode='outlined'
                            label="Email"
                            placeholder="Ingrese el correo electronico"
                            style={loginStyle.cajaTexto}
                            keyboardType="email-address"
                            onChangeText={email => setEmail(email)}
                            value={ email }
                            // onSubmitEditing = {onRegister}
                            autoCorrect = {false}
                    />

                    <TextInput
                            secureTextEntry={true}
                            mode='outlined'
                            label="Contraseña"
                            placeholder="Ingrese la contraseña"
                            style={loginStyle.cajaTexto}
                            onChangeText={password => setPassword(password)}
                            value={ password }
                            // onSubmitEditing = {onRegister}
                            autoCorrect = {false}
                    />

                    <View>
                        <TouchableOpacity 
                        style={loginStyle.botonAceptar}
                        onPress={postDataUsuario}
                        >
                        <Text style={loginStyle.textoboton}>Crear Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </ScrollView>
        </KeyboardAvoidingView>

        </>
    )
}

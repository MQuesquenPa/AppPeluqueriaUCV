import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react'
import {  StyleSheet, Text, View, Image} from 'react-native'
import { styles } from '../theme/appTheme'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const MasScreen = ({navigation}) => {

    const navigator = useNavigation();
    
    useEffect(() => {
        console.log('Mass')
    }, [])


    useEffect(() => {
        navigator.setOptions({
            title: 'Mas',
            headerBackTitle:  'back'
        })
    }, [])
    
    // const navigation = useNavigation();
    return (
        <>
            <View style={styless.imagen}>
                {/* <Image 
                    source={require('../img/logo-react-native.png')}
                /> */}
                <Icon name={'alert-circle-outline'} size={ 200 } color= { 'blue'} />  
            </View>
            <View style={styless.contenedor}>
                <TouchableOpacity 
                        style={styless.boton}
                        onPress={() => navigation.navigate( 'NosotrosScreen' )}>
                            <Icon name={'people-circle-outline'} size={ 30 } color= { 'black'} />  
                            <Text style={styless.texto}>Nosotros</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                        style={styless.boton}
                        onPress={() => navigation.navigate( 'PerfilScreen' )}>
                            <Icon name={'happy-outline'} size={ 30 } color= { 'black'} />  
                            <Text style={styless.texto}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styless.boton}
                        // onPress={() => navigation.replace( 'LoginScreen' )}
                        onPress={() => navigation.navigate( 'LoginScreen' )}

                        >
                            <Icon name={'log-in-outline'} size={ 30 } color= { 'black'} />  
                            <Text style={styless.texto}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
            
            {/* <View style={styles.globalMargin}>
                <Text style={styless.titulo}>Mas</Text>
                <Button 
                    title= 'regresar'
                    onPress={() => navigator.pop()}
                />
                <Button 
                    title= 'ir a home'
                    onPress={() => navigator.popToTop()}
                />
            </View>   */}
        </>
    )
}

const styless = StyleSheet.create({
    imagen:{
        flex: 1,
        alignSelf: 'center',
    },
    contenedor:{
        flex: 1,
        marginHorizontal: 30
    },
    boton: {
        flexDirection: 'row'

    },
    texto: {
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 5
    }



})
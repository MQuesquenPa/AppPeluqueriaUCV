import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';

export const NosotrosScreen = () => {
    return (
        <>
            <View style={styless.contenedor}>
                <Text style={styless.titulo}>Acerca de Nosotros</Text>
                <Text style={styless.subtitulo}>Contamos no solo con los mejores profesionales del medio, sino también con equipos de alta tecnología que aseguran los mejores tratamientos.​</Text>
                <Text style={styless.titulo}>Nuestras Redes</Text>
            </View>  
            <View style={styless.botones}>
                <TouchableOpacity 
                    style={styless.iconos}
                    onPress={() => { }}
                >
                    <Icon name="logo-facebook" size={50} color= { '#3459A0'}/>
                </TouchableOpacity >
                <TouchableOpacity 
                    style={styless.iconos}
                    onPress={() => {}}
                >
                    <Icon name="logo-twitter" size={50} color= { '#1DABDD'} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styless.iconos}
                    onPress={() => {alert('Numero copiado satisfactoriamente') ;} }
                >
                    <Icon name="logo-whatsapp" size={50} color= { '#87FC70'} />
                </TouchableOpacity>
            </View>
        </>
    )
}
const styless = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        textDecorationLine: 'underline'

    },
    subtitulo: {
        fontSize: 20,
        alignSelf: 'center',
    },
    botones:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    }, 
    iconos: {
        marginRight: 15
    }
})
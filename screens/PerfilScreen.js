import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export const PerfilScreen = ({navigation}) => {

    const navigator = useNavigation();

    return (
        <>
            <View style={styles.contenedor}>
                <Text style={styles.nombre}>Juan Perez</Text>
                <Icon name="person-outline" size={70}  style={styles.icono}/>
                
            </View>  
            <View style={styles.titulo}>
                <Text style={styles.subTitulo}>Informacion</Text>

            </View>
{/* aqui otro */}
            <View style={styles.info}>
                <View style={styles.boton} >
                    <Icon name={'person-outline'} size={ 30 } color= { 'black'} />  
                    <Text style={styles.texto}>Juan Perez</Text>
                </View>

                <View style={styles.boton} >
                    <Icon name={'phone-portrait-outline'} size={ 30 } color= { 'black'} />  
                    <Text style={styles.texto}>985 658 214</Text>
                </View>

                <View style={styles.boton} >
                    <Icon name={'male-outline'} size={ 30 } color= { 'black'} />  
                    <Text style={styles.texto}>Masculino</Text>
                </View>
            </View>
            <View style={styles.info}>
                <TouchableOpacity 
                style={styles.botonAceptar}
                onPress={() => navigation.navigate( 'HomeScreen' )}>
                <Text style={styles.textoboton}>Aceptar</Text>
                </TouchableOpacity>
            </View>
           
        </>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        alignSelf: 'center',
        // backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        marginTop: '5%',
        
    },
    nombre: {
        fontSize: 20,
    },
    icono: {
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
        marginTop: 10,
    },
    titulo:{
        alignSelf: 'flex-start',
        backgroundColor: 'gray',
        borderWidth: 2,
        width: '100%',
        marginTop: 10
    },
    subTitulo:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    info:{
        flex: 1,
        marginHorizontal: 30,
        marginTop: '5%',
    },
    boton: {
        flexDirection: 'row',
        marginTop: 10

    },
    texto: {
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 5,
        
    },
    textoboton:{
        borderWidth : 1,
        fontSize: 25,
        textAlign: 'center',
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        color: 'white'
    }

})
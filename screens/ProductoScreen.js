import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core'

import ImagePicker from 'react-native-image-crop-picker';

export const ProductoScreen = ({navigation}) => {
    return (
        <>
          <TouchableOpacity 
                style={styles.btnVolver}
                onPress={() => navigation.navigate( 'ProductosAllScreen' )}
            >
                <Icon name={'chevron-back-outline'} size={ 22 } color= { '#030099'} />
                <Text style={styles.textoBtn}>volver</Text>
            </TouchableOpacity>
            <View style={styles.titulo}>
                <Text style={styles.texto}>REGISTRO DE PRODUCTOS</Text> 
            </View>

            <ScrollView>
            <View style={styles.cajaTexto}>
            
            <TextInput
                mode='outlined'
                label="Nombre del Producto"
                placeholder="Ingrese el nombre del producto"
                // onChangeText={descripcion => setDescripcion(descripcion)}
                // value= {descripcion}
            />
            </View>
            <View style={styles.cajaTexto}>
            
                <TextInput
                    mode='outlined'
                    label="Descripcion del Producto"
                    placeholder="Ingrese la descripcion del producto"
                    // onChangeText={descripcion => setDescripcion(descripcion)}
                    // value= {descripcion}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Stock"
                    placeholder="Ingrese el stock"
                    keyboardType = 'numeric'
                    // onChangeText={cliente => setCliente(cliente)}
                    // value= {cliente}
                />
               
            </View>
    
            <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Precio"
                    placeholder="Ingrese el precio del servicio"
                    keyboardType = 'decimal-pad'
                    // onChangeText={precio => setPrecio(precio)}
                    // value= {precio}
                />
               
            </View>
            {/* <View style={styles.cajaTexto}>
               {peluqueros ? <DropDownPicker
                        placeholder="Selecciona El Peluquero"
                        onChangeItem={(e)=>{setPeluqueroElegido(e.value)}}
                        containerStyle={{height:42}}
                        style={{height:42}}
                        globalTextStyle={{fontSize:11}}
                        placeholderStyle={{color:"gray"}}
                        value={peluqueros}
                        itemStyle={{
                            justifyContent: 'flex-start',borderColor:'rgba(0,0,0,0.045)'
                    }}
                    items={peluqueros}
                /> : null}
            </View> */}
            <View>
                <TouchableOpacity onPress={() =>{postDataReserva()}}>
                <View style={styles.boton}>
                    <Text style={styles.botonText}>Registrars</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    titulo: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 17,
        marginLeft: 50

    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    btnVolver:{
        position: 'absolute',
        top: 20,
        left: 10,
        flexDirection: 'row',
    },
    textoBtn:{
        color: '#030099',
        fontSize: 15,
        // textDecorationLine: 'underline',
    },

    cajaTexto:{
        // backgroundColor: 'green',
        marginTop: 20,
        paddingTop: 0,
        marginHorizontal:10
    },
  
    boton:{
        backgroundColor: '#5856D6',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 100,
        height: 40,
        marginHorizontal: 40
    },
    botonText:{
        // backgroundColor: 'blue',
        marginTop: 10,
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',

    },



})
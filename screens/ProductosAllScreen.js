import React, { useEffect, useState } from 'react'
import { View , Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import { loginStyle } from '../theme/loginTheme';
import apiCall from '../services/api';

import { ProductosNavigator } from '../navigator/ProductosNavigator';


export const ProductosAllScreen = ({ navigation}) => {


    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);

    useEffect(() => {
        console.log('Productos');
        getData();
    }, [])


    const getData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'select-producto-by-name';
            let dataResponse = await apiCall('GET', url, null, head);
            console.log(dataResponse.data.dataProducto);
            setData(dataResponse.data.dataProducto);
            setLoading(false);
            
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
            
            <View style={styles.titulo}>
                <TouchableOpacity onPress={() => { getData() }}>
                    <Text style={styles.texto}>Productos</Text>
                </TouchableOpacity>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ProductoScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {/* Productos Datos */}
                {data.length>0 ? 
                    data.map((item,index)=>{
                        return(
                            
                            <View key={index} style={styles.cajas}>
                                <View style={styles.caja}>
                                    <View style={styles.imagen}>
                                        {/* <Icon name="calendar-outline" size={40} color="#5856D6"/> */}
                                        <Image 
                                            source = {{uri:item.imagen}}
                                            style = {{width: 50, height: 100 }}
                                        />
                                    </View>
                                    <View style={styles.textoMedio}>
                                        <Text >Nombre: {item.nombre}</Text>
                                        <Text >Descripcion: {item.descripcion}</Text>
                                        <Text >{item.stock} unidades</Text>

                                    </View>
                                    <View style={styles.imagenDerecha}>
                                        <TouchableOpacity
                                            onPress={() => {}}
                                        >
                                            <Icon name="caret-forward-outline" size={40} color="#5856D6"/>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                        )
                        
                    })
                : null}
                    {/* <View style={styles.cajas}>
                        <View style={styles.caja}>
                            <View style={styles.imagen}>
                                <Icon name="calendar-outline" size={40} color="#5856D6"/>
                            </View>
                            <View style={styles.textoMedio}>
                                <Text>TINTE</Text>
                                <Text>juego </Text>
                                <Text>5 UNID</Text>

                            </View>
                            <View style={styles.imagenDerecha}>
                                <TouchableOpacity
                                    onPress={() => {}}
                                >
                                    <Icon name="caret-forward-outline" size={40} color="#5856D6"/>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    titulo: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row'
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconoBuscar:{
        marginLeft: '50%',
        marginTop: -5
    },
    cajas:{
        borderRadius : 30,
        marginHorizontal: 10,
        // backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.20)',
        marginTop: 10
        // alignSelf: 'center',
    },
    caja:{
        width: '100%',
        // alignSelf: 'center',
        flexDirection: 'row',
        padding: 10,
        // backgroundColor: 'gray',
        
    },
    imagen:{
        flex: 1,
        // backgroundColor: 'pink',
        alignSelf: "flex-start",
        alignSelf: 'center',
        
    },
    textoMedio:{
        flex: 2,
        // backgroundColor: 'green',
        alignSelf: "center",
        
    },
    imagenDerecha:{
        
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginLeft: '10%'
    }

})
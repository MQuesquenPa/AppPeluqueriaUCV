import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import apiCall from '../services/api';


export  const ReservasAllScreen = ({ navigation}) => {
    
    const navigator = useNavigation();
    
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    
    useEffect(() => {
        console.log('ReservaComponent');
        getData();
    }, [])
    
    const getData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'select-reserva-by-name';
            let dataResponse = await apiCall('GET', url, null, head);
            console.log(dataResponse.data.dataReserva);
            setData(dataResponse.data.dataReserva);
            setLoading(false);
            
        }catch(e){
            console.log(e);
        }
    }
    

    return (
        <>
            <View style={styles.titulo}>
                <Text style={styles.texto}>Reservas</Text>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ReservaScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView>
                {/* <ReservaDatos /> */}
                {data.length>0 ? 
                    data.map((item,index)=>{
                        return(
                            <>
                            {/* <Text key={index}>{item.nombre}</Text> */}
                            <View style={styles.cajas}>
                                <View style={styles.caja}>
                                    <View style={styles.imagen}>
                                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                                    </View>
                                    <View style={styles.textoMedio}>
                                        <Text key={index} >Cliente: {item.alias} </Text>
                                        <Text key={index} >Servicio: {item.descripcion} </Text>
                                        <Text key={index} >Fecha: {item.fecha} </Text>
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
                            </>
                        )
                        
                    })
                : null}
                
                
            

            
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
        // alignSelf: "flex-end",
        alignSelf: 'center',
        marginLeft: '10%'

    }
});

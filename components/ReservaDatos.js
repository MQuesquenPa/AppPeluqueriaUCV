import React, {useEffect, useState} from 'react'
import apiCall from '../services/api';
import { StyleSheet, Text, View, ScrollView } from 'react-native'

export const ReservaDatos = () => {

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
                
        </>
    )
}

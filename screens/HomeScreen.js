import React, { useEffect,useState}  from 'react'

import {Image, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { colores, styles } from '../theme/appTheme'

import Icon from 'react-native-vector-icons/Ionicons';
import apiCall from '../services/api';

export const HomeScreen = ({ navigation }) => {
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);

    useEffect(() => {
        getData();
    }, []);

    // const getData=async()=>{
    //     try{
    //         let head={'Content-Type': 'application/json'};
    //         let carpeta = 'api/users';
    //         let dataResponse = await apiCall('GET', carpeta, null, head);
    //         console.log(dataResponse.data);
    //         setData(dataResponse.data);
    //         setLoading(false);
    //     }catch(e){
    //         console.log(e);
    //     }
    // }


    // const searchUser=async()=>{
    //     try{
    //         let head={'Content-Type': 'application/json'};
    //         let carpeta = 'api/users';
    //         let dataSend={name: "Miguel pRUEBA",age: "23",email: "miDSDDSguelon@gmail.com"};
    //         let dataResponse = await apiCall('POST', carpeta, dataSend,head);
    //         console.log(dataResponse.data);
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    const getData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'select-peluquero-by-name';
            let dataResponse = await apiCall('GET', url, null, head);
            console.log(dataResponse.data.dataPeluquero);
            setData(dataResponse.data.dataPeluquero);
            setLoading(false);
        }catch(e){
            console.log(e);
        }
    }


    const searchUser=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'api/users';
            let dataSend={name: "Miguel pRUEBA",age: "23",email: "miDSDDSguelon@gmail.com"};
            let dataResponse = await apiCall('POST', url, dataSend,head);
            console.log(dataResponse.data.dataPeluquero);
        }catch(e){
            console.log(e);
        }
    }

    const [text, onChangeText] = React.useState("ingresa un texto");
    const [number, onChangeNumber] = React.useState(null);
    return (
        <>
            <View style={styless.titulo}>
                <Text style={styless.texto}>FOTOS DE CORTES REALIZADOS</Text>
                <Icon style={styless.iconoCam} name="camera-outline" size={40} color="#5856D6"/>
            </View>
            <ScrollView>
            <View style={styless.colum}>
                <View style={styless.cajas}>
                    <Image source={require('../img/Corte03.jpg')} style={styless.imagen} />
                    <Image source={require('../img/Corte05.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte07.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte08.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte10.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte11.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte12.jpg')} style={styless.imagen}/>
                </View>
                <View style={styless.cajas2}>
                    <Image source={require('../img/Corte13.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte14.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte15.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte16.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte17.jpg')} style={styless.imagen}/>
                    <Image source={require('../img/Corte18.jpg')} style={styless.imagen}/>
                </View>                
            </View>
            </ScrollView>

        </>
    )
}

const styless = StyleSheet.create({
    titulo: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    texto: {
        fontSize: 19,
        fontWeight: 'bold',

    },
    iconoCam:{
        marginLeft: 20,
        marginTop: -10 ,
    },
    colum:{

        flexDirection: 'row',
        alignSelf: 'center',
    },
    cajas:{
        
        padding: 10
    },
    cajas:{
        padding: 10,

    },
    imagen:{
        width: 165,
        height: 150,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'

    }
})
import React, { useEffect, useState } from 'react'
import { View ,  Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { Provider as PaperProvider, Modal, Portal,  TextInput} from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'

import apiCall from '../services/api';

import { peluqueroStyles } from '../theme/peluqueroTheme';


export const PeluquerosAllScreen = ({ navigation}) => {
    
    
    const [nombre, setNombre] = useState('');
    const [nombreUpdate, setNombreUpdate] = useState('');
    
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idEdit, setIdEdit] = useState('');
    
    useEffect(() => {
        console.log('PeluquerosAll');
        console.log(getData());
        getData();
    }, [])

    
    const limpiar = () => {
      console.log({nombre, apellido, direccion, telefono});
      setNombre('');
      setApellido('');
      setDireccion('');
      setTelefono('');
    };



    const [visible, setVisible] = React.useState(false);

    const hideModalNew = () => {
        setVisible(false);
    }
        

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);


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

    const postUpdateData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'update-peluquero-by-name';
            let dato={nombre:nombreUpdate, nuevoNombre: nombre,  nuevoApellido:apellido, nuevoDireccion:direccion, nuevoTelefono:telefono}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
                limpiar();
                alert('se actualizo');
                getData();
                hideModalNew(); 
                
            }else{
                console.log("error");
                console.log(dataResponse.data);
                alert('NO se actualizo');
            }
            
        }catch(e){
            console.log(e);
        }
    }
       

    const postDeleteData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'delete-peluquero-by-name';
            let dato={nombre:nombre, _id: idEdit}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
                limpiar();
                alert('se elimino');
                getData();
                hideModalNew(); 
                
            }else{
                console.log("error");
                console.log(dataResponse.data);
                alert('NO se elimino');
            }
            
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
        <PaperProvider >
            <View style={peluqueroStyles.titulo}>
            <TouchableOpacity onPress={() => {getData()}}>
                <Text style={peluqueroStyles.texto}>Peluqueros</Text>
                </TouchableOpacity>
                
                <View style={peluqueroStyles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'PeluqueroScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {data.length>0 ? 
                    data.map((item, index)=>{
                        return(
                            <View key={index} style={peluqueroStyles.cajas}>
                                <View style={peluqueroStyles.caja}>
                                    <View style={peluqueroStyles.imagen}>
                                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                                    </View>
                                    <View style={peluqueroStyles.textoMedio}>
                                        <Text >Nombre: {item.nombre}</Text>
                                        <Text >Apellido: {item.apellido}</Text>
                                        <Text >Telefono: {item.telefono}</Text>

                                    </View>
                                    <View style={peluqueroStyles.imagenDerecha}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setVisible(true);
                                                setNombre(item.nombre);
                                                setApellido(item.apellido);
                                                setDireccion(item.direccion);
                                                setTelefono(item.telefono.toString());
                                                setIdEdit(item._id)
                                                setNombreUpdate(item.nombre)
                                                console.log(item.telefono, item.direccion, item.apellido, item.nombre, item._id)
                                            }}
                                        >
                                            <Icon name="caret-forward-outline" size={40} color="#5856D6"/>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                        
                    })
                : null}
                
                
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModalNew} contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 20,
                            width:'80%',
                            alignSelf:'center'}}>
                            <View>
                            <View style={peluqueroStyles.titulo}>
                                <Text style={peluqueroStyles.texto}>PELUQUERO</Text> 
                            </View>
                            <View style={peluqueroStyles.cajaTexto}>
                                <TextInput
                                    mode='outlined'
                                    label="Nombre"
                                    placeholder="Ingrese el nombre del peluquero"
                                    onChangeText={nombre => setNombre(nombre)}
                                    value= {nombre}
                                />
                            </View>
                            <View style={peluqueroStyles.cajaTexto}>
                                <TextInput
                                    mode='outlined'
                                    label="Apellido"
                                    placeholder="Ingrese el apellido del peluquero"
                                    onChangeText={apellido => setApellido(apellido)}
                                    value= {apellido}
                                />
                            </View>
                            <View style={peluqueroStyles.cajaTexto}>
                                <TextInput
                                    mode='outlined'
                                    label="Direccion"
                                    placeholder="Ingrese la direccion del peluquero"
                                    onChangeText={direccion => setDireccion(direccion)}
                                    value= {direccion}
                                />
                            </View>
                            <View style={peluqueroStyles.cajaTexto}>
                                <TextInput
                                    mode='outlined'
                                    label="Telefono"
                                    keyboardType="numeric"
                                    placeholder="Ingrese el telefono del peluquero"
                                    onChangeText={telefono => setTelefono(telefono)}
                                    value= {telefono}
                                />
                            </View>
                            
                            
                                <View style={peluqueroStyles.botonModal}>
                                    <TouchableOpacity onPress={() =>{postUpdateData()}}>
                                    <View style={peluqueroStyles.boton}>
                                        <Text style={peluqueroStyles.botonText}>Actualizar</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>{postDeleteData()}}>
                                    <View style={peluqueroStyles.botonDelete}>
                                        <Text style={peluqueroStyles.botonText}>Eliminar</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </Portal>
                
                
                </ScrollView>
            </PaperProvider>
        </>
    )
}

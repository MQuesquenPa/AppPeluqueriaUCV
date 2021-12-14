import React, { useEffect, useState } from 'react'
import { View ,  StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import { peluqueroStyles } from '../theme/peluqueroTheme';
import { Provider as PaperProvider, Modal, Portal, Text, TextInput, ActivityIndicator} from "react-native-paper";
import apiCall from '../services/api';

export const ClientesAllScreen = ({navigation}) => {
    
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);


    const [nombre, setNombre] = useState('');
    const [nombreUpdate, setNombreUpdate] = useState('');

    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idEdit, setIdEdit] = useState('');

    useEffect(() => {
        console.log('ClientesAll');
        getData();
    }, [])

    
    const limpiar = () => {
        console.log({nombre, apellido, direccion, telefono});
        setNombre('');
        setApellido('');
        setDireccion('');
        setTelefono('');
    };
  
    const [visible, setVisible] = useState(false);

    const hideModalNew = () => {
        setVisible(false);
    }



    const getData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'select-cliente-by-name';
            let dataResponse = await apiCall('GET', url, null, head);
            console.log(dataResponse.data.dataCliente);
            setData(dataResponse.data.dataCliente);
            setLoading(false);
            
        }catch(e){
            console.log(e);
        }
    }

    const postUpdateData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'update-cliente-by-name';
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
            let url = 'delete-cliente-by-name';
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
            <View style={styles.titulo}>
                <Text style={styles.texto}>Clientes</Text>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ClienteScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {data.length>0 ? 
                    data.map((item,index)=>{
                        return(
                            
                            <View key={index} style={styles.cajas}>
                                <View style={styles.caja}>
                                    <View style={styles.imagen}>
                                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                                    </View>
                                    <View  style={styles.textoMedio}>
                                        <Text >Nombre: {item.nombre}</Text>
                                        <Text >Apellido: {item.apellido}</Text>
                                        <Text >Telefono: {item.telefono}</Text>

                                    </View>
                                    <View style={styles.imagenDerecha}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setVisible(true);
                                                setNombre(item.nombre);
                                                setApellido(item.apellido);
                                                setDireccion(item.direccion);
                                                setTelefono(item.telefono.toString());
                                                setIdEdit(item._id)
                                                setNombreUpdate(item.nombre)
                                            }}
                                        >
                                            <Icon name="caret-forward-outline" size={40} color="#5856D6"/>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                   
                        )
                        
                    })
                : 
                    <View style={{flex:1,justifyContent:'center',alignItems:'center', marginTop: '50%'}}>
                        <ActivityIndicator animating={true} color={'red'} />
                        <Text>CARGANDO</Text>
                    </View>
                }
                <Portal>
                        <Modal visible={visible} onDismiss={hideModalNew} contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 20,
                            width:'80%',
                            alignSelf:'center'}}>
                                <View style={peluqueroStyles.titulo}>
                                <Text style={peluqueroStyles.texto}>PELUQUERO</Text> 
                                        
                                    <TouchableOpacity onPress={() =>{hideModalNew()}}>

                                        
                                    </TouchableOpacity>
                                        
                                
                                </View>
                                <View style={styles.cajaTexto}>
                                    <TextInput
                                        mode='outlined'
                                        label="Nombre"
                                        placeholder="Ingrese el nombre del cliente"
                                        onChangeText={nombre => setNombre(nombre)}
                                        value= {nombre}
                                    />
                                </View>
                                <View style={styles.cajaTexto}>
                                    <TextInput
                                        mode='outlined'
                                        label="Apellido"
                                        placeholder="Ingrese el apellido del cliente"
                                        onChangeText={apellido => setApellido(apellido)}
                                        value= {apellido}
                                    />
                                </View>
                                <View style={styles.cajaTexto}>
                                    <TextInput
                                        mode='outlined'
                                        label="Direccion"
                                        placeholder="Ingrese la direccion del cliente"
                                        onChangeText={direccion => setDireccion(direccion)}
                                        value= {direccion}
                                    />
                                </View>
                                <View style={styles.cajaTexto}>
                                    <TextInput
                                        mode='outlined'
                                        label="Telefono"
                                        keyboardType="numeric"
                                        placeholder="Ingrese el telefono del cliente"
                                        onChangeText={telefono => setTelefono(telefono)}
                                        value= {telefono}
                                    />
                                </View>
                                
                                <View>
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


                        </Modal>
                </Portal>
            </ScrollView>
        </PaperProvider>
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

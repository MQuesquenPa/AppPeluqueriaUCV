import React, { useEffect, useState } from 'react'
import { View , StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import apiCall from '../services/api';
import { Provider as PaperProvider, Modal, Portal, Text, TextInput, ActivityIndicator} from "react-native-paper";
import { peluqueroStyles } from '../theme/peluqueroTheme';
import { ProductosNavigator } from '../navigator/ProductosNavigator';


export const ProductosAllScreen = ({ navigation}) => {

    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState('');
    const [stockUpdate, setStockUpdate] = useState('');

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    const [visible, setVisible] = useState(false);
    const [idEdit, setIdEdit] = useState('');

    useEffect(() => {
        console.log('Productos');
        getData();
    }, [])

    const hideModalNew = () => {
        setVisible(false);
    }

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

    const postUpdateData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'update-producto-by-name';
            let dato={nombre: nombre, nuevoStock:stock}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
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
            let url = 'delete-producto-by-name';
            let dato={nombre:nombre, _id: idEdit}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
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
                                            onPress={() => {
                                                setVisible(true); 
                                                setNombre(item.nombre);
                                                setStock(item.stock.toString());
                                                setIdEdit(item._id);
                                                setStockUpdate(item.stock.toString());


                                            }}>
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
                            <View>
                                <View style={peluqueroStyles.titulo}>
                                    <Text style={peluqueroStyles.texto}>PRODUCTO</Text> 
                                </View>
                                <View style={styles.cajaTexto}>
                                    <TextInput
                                        mode='outlined'
                                        label="Stock"
                                        keyboardType="numeric"
                                        placeholder="Ingrese el stock de productos"
                                        onChangeText={stock => setStock(stock)}
                                        value= {stock}
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
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Image  } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import DropDownPicker from 'react-native-dropdown-picker';
import apiCall from '../services/api';
import ImagePicker from 'react-native-image-crop-picker';



export const ProductoScreen = ({navigation}) => {   
    useEffect(() => {
        getDataInitial();
    }, [])

    const sheetRef = React.useRef(0);

    const [show, setShow] = useState(false);
    
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoriaElegida, setCategoriaElegida] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const [imageUri, setImageUri] = useState('')

    const limpiar= () => {
        setNombre('');
        setDescripcion('');
        setStock('');
        setPrecio('');
        setImageUri('');
    }

    const generateFileName=(val)=>{
        return  val.split('/').pop();
    }
      
    const generateType=(val)=>{
        let match = /\.(\w+)$/.exec(val);
        if(match==="mp4"){
            return match ? `video/${match[1]}` : `video`;
        }else{
            return match ? `image/${match[1]}` : `image`;
        }    
    }

    const getDataInitial=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            const dataResponse = await apiCall('GET','select-category-by-name',null,head);
            if(dataResponse.data.status=="success"){
                let tempData=dataResponse.data.dataCategoria;
                console.log(dataResponse.data.dataCategoria);

                let dataArrayFixed = tempData.map(item => {
                    return {label:item.nombre, value:item._id}; 
                });
                setCategorias(dataArrayFixed);
                
            }else{
                console.log(dataResponse.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    ////////////////////////////////////////
    const TakePhotoFromCamera=()=>{
        ImagePicker.openCamera({
            mediaType:'photo',
            cropping: true,
            width: 350,
            height: 350,
            compressImageQuality:0.9
          }).then(image => {
              console.log(image);
              setImageUri(image.path)
          })
    }

    const TakePhotoGalery=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setImageUri(image.path);

          });
    }


    const showMode = () => {
        setShow(true);
    };
    
    const hideMode = () => {
        setShow(false);
    };

    const renderContent = () => (
    
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Subir Photo</Text>
                <Text style={styles.panelSubtitle}>Elige la foto del producto</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={() => { TakePhotoFromCamera(); hideMode(); }}>
                <Text style={styles.panelButtonTitle}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => { TakePhotoGalery(); hideMode(); }}>
                <Text style={styles.panelButtonTitle}>Abrir Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => setShow(false)}>
                <Text style={styles.panelButtonTitle}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );

    const registerProduct=async()=>{
    const formData = new FormData();
      let filename=generateFileName(imageUri);
      let typeImage = generateType(filename);

      formData.append('nombre',nombre);
      formData.append('descripcion',descripcion);
      formData.append('stock',stock);
      formData.append('precio',precio);
      formData.append('categoria',categoriaElegida);

      formData.append('foto',{
        uri: imageUri,
       type: typeImage, 
       name: filename,
      });

      try{
        let method='POST';
        let url="nuevo-producto-imagen";
        let data=formData;
        let head={Accept: 'application/json','Content-Type': 'multipart/form-data'};
        const responseData = await apiCall(method,url,data,head);
        console.log(responseData.data);
      }catch(e){
          console.log(e);
          res.json("error");
      }
  
    }

    return (
        <>
            <TouchableOpacity 
                style={styles.btnVolver}
                onPress={() => {limpiar(); navigation.navigate( 'ProductosAllScreen' )}}
            >
                <Icon name={'chevron-back-outline'} size={ 22 } color= { '#030099'} />
                <Text style={styles.textoBtn}>volver</Text>
            </TouchableOpacity>
            <View style={styles.titulo}>
                <Text style={styles.texto}> REGISTRO DE PRODUCTOS</Text> 
            </View>
            <ScrollView>
            <View style={styles.cajaTexto}>
            
                <TextInput
                    mode='outlined'
                    label="Nombre"
                    placeholder="Ingrese el nombre del producto"
                    onChangeText={nombre => setNombre(nombre)}
                    value= {nombre}
                />
            </View>
            <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Descripcion"
                    placeholder="Ingrese la descripcion del producto"
                    onChangeText={descripcion => setDescripcion(descripcion)}
                    value= {descripcion}
                />
               
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
            
            <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Precio"
                    keyboardType="numeric"
                    placeholder="Ingrese el precio del productos"
                    onChangeText={precio => setPrecio(precio)}
                    value= {precio}
                />
               
            </View>
            <View style={styles.cajaTexto}>
               {categorias ? <DropDownPicker
                        placeholder="Selecciona la Categoria"
                        onChangeItem={(e)=>{setCategoriaElegida(e.value)}}
                        
                        containerStyle={{height:42}}
                        style={{height:42}}
                        globalTextStyle={{fontSize:11}}
                        placeholderStyle={{color:"gray"}}
                        value={categoriaElegida}
                        itemStyle={{
                            justifyContent: 'flex-start',borderColor:'rgba(0,0,0,0.045)'
                    }}
                    items={categorias}
                /> : null}
            </View>
            {/* BOTONES DE LA IMG */}
            <Text style={{ padding: 15}}>Imagen:</Text>
            <View
                style={{
                flex: 1,
                // backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <TouchableOpacity onPress={() => showMode()} >
                { imageUri ? <Image
                    source={{uri:imageUri}}
                    resizeMode={"contain"}
                    style={{
                    marginTop: 10,
                    marginBottom: 5,
                    height: 300,
                    width: 300,
                    // borderRadius: 100,
                    borderWidth: 2,
                    borderColor: 'black',
                    }}
                    />
                    :
                    <TouchableOpacity onPress={() => showMode()} >
                    <Text style={{marginTop:5, color:'blue', textDecorationLine:'underline'}} >
                        Seleccionar Imagen</Text>

                    </TouchableOpacity>
                }
                </TouchableOpacity>
                
            </View>

            <TouchableOpacity
                style={styles.btnRegistrar}
                onPress={() => {registerProduct(); limpiar(); navigation.navigate( 'ProductosAllScreen' );}}
                // onPress={{registerProduct(); limpiar(); }}
                >
                <Text style={styles.panelButtonTitle}>Registrar</Text>
            </TouchableOpacity>

            </ScrollView> 
          
            {show && (
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[250, 250, 0]}
                    borderRadius={10}
                    renderContent={renderContent}
                    onOpenStart = {hideMode}
                />
            )}

        </>
      );

   
}

const styles = StyleSheet.create({
    panel: {
        padding: 20,
        backgroundColor: '#dddddd',
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'black',
        height: 30,
        
      },
      panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#5856D6',
        alignItems: 'center',
        marginVertical: 3,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        
      },
      btnRegistrar:{
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#5856D6',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 50,
      },

    //////////////////
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
     
    },
    ////////////////////////////
   
   
    cajaTexto:{
        // backgroundColor: 'green',
        marginTop: 20,
        paddingTop: 0,
        marginHorizontal:10
    },
    cajaFecha:{
        // backgroundColor: 'green',
        marginHorizontal:10,
        marginTop: 20,
        paddingTop: 0,
        flexDirection: 'row'

    },
    textoFecha:{
        alignSelf: 'center',
        fontSize: 15,
        // backgroundColor: 'gray',
        marginRight: 5
    },
    fechaHora:{
        alignSelf: 'center',
        fontSize: 15,
        // backgroundColor: 'blue',
        marginRight: 15
    },
    iconos:{
        marginRight: 15,
        // backgroundColor: 'purple',
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
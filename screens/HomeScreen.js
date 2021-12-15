import React, { useEffect,useState}  from 'react'

import {Image, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';
import { colores, styles } from '../theme/appTheme'
import { stylesBottomSheet } from '../theme/botomSelecCam';
import ImagePicker from 'react-native-image-crop-picker';
import { Provider as PaperProvider, Modal, Portal,   ActivityIndicator} from "react-native-paper";


import Icon from 'react-native-vector-icons/Ionicons';
import apiCall from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HomeScreen = ({ navigation }) => {
    
    const sheetRef = React.useRef(0);

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    const [text, onChangeText] = useState("ingresa un texto");
    const [number, onChangeNumber] = useState(null);
    const [show, setShow] = useState(false);
    const [imageUri, setImageUri] = useState('')

    const [visible, setVisible] = useState(false);

    const hideModalNew = () => {
        setVisible(false);
    }

    useEffect(() => {
        getData();
    }, []);

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

    const registerPhoto=async()=>{
        const formData = new FormData();
          let filename=generateFileName(imageUri);
          let typeImage = generateType(filename);
          formData.append('foto',{
            uri: imageUri,
           type: typeImage, 
           name: filename,
          });
    
          try{
            let method='POST';
            let url="nuevo-foto-imagen";
            let data=formData;
            let head={Accept: 'application/json','Content-Type': 'multipart/form-data'};
            const responseData = await apiCall(method,url,data,head);
            console.log(responseData.data);
          }catch(e){
              console.log(e);
              res.json("error");
          }
      
        }


        const getData=async()=>{
            try{
                let head={'Content-Type': 'application/json'};
                let url = 'select-foto-by-name';
                let dataResponse = await apiCall('GET', url, null, head);
                console.log(dataResponse.data.dataFoto);
                setData(dataResponse.data.dataFoto);
                setLoading(false);
                
            }catch(e){
                console.log(e);
            }
        }

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
    
        <View style={stylesBottomSheet.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={stylesBottomSheet.panelTitle}>Subir Photo</Text>
                <Text style={stylesBottomSheet.panelSubtitle}>Elige la foto del producto</Text>
            </View>
            <TouchableOpacity style={stylesBottomSheet.panelButton} onPress={() => { TakePhotoFromCamera(); hideMode(); }}>
                <Text style={stylesBottomSheet.panelButtonTitle}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesBottomSheet.panelButton} onPress={() => { TakePhotoGalery(); hideMode(); }}>
                <Text style={stylesBottomSheet.panelButtonTitle}>Abrir Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={stylesBottomSheet.panelButton}
                onPress={() => setShow(false)}>
                <Text style={stylesBottomSheet.panelButtonTitle}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
        <PaperProvider >
            <View style={styless.titulo}>
                <TouchableOpacity onPress={() => { getData() }}>
                        <Text style={styless.texto}>FOTOS DE CORTES REALIZADOS</Text>
                </TouchableOpacity>
                    
                {/* /////////////////////// */}
                <TouchableOpacity onPress={() => {setVisible(true);}} >
                        <Icon style={styless.iconoCam} name="camera-outline" size={40} color="#5856D6"/> 
                </TouchableOpacity>
               
                {/*/////////////////////////*/}
            </View>
            <ScrollView>
            <View style={styless.colum}>
            {data.length>0 ? 
                    data.map((item,index)=>{
                        return(
                            
                        <View key={index} >
                           
                           <Image 
                            source = {{uri:item.imagen}}
                            // style = {{width: 50, height: 100 }}
                            style={styless.imagen}
                            />
     
                        </View>
                        )
                        
                    })
                : 
                    <View style={{flex:1,justifyContent:'center',alignItems:'center', marginTop: '50%'}}>
                    
                    <ActivityIndicator animating={true} color={'red'} />

                    <Text>CARGANDO</Text>
                    </View>
                }
                    </View>
                   
            {/* ////////////////////// */}
            <Portal>
                        <Modal visible={visible} onDismiss={hideModalNew} contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 20,
                            width:'80%',
                            alignSelf:'center'}}>
                            
                            <View style={styless.titulo}>
                                <Text style={styless.texto}>FOTO</Text> 
                            </View>
                            {/* ///////////////// */}
                            <TouchableOpacity onPress={() => {}} >
                            { imageUri ? 
                            
                            <Image
                                source={{uri:imageUri}}
                                resizeMode={"contain"}
                                style={{
                                marginTop: 10,
                                marginBottom: 5,
                                height: 200,
                                width: 240,
                                // borderRadius: 100,
                                borderWidth: 2,
                                borderColor: 'black',
                                }}
                                />
                                : 
                                <Text style={{
                                    marginTop: 10,
                                    marginBottom: 5,
                                    height: 100,
                                    width: 240,
                                    // borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    }}>AGREGAR IMAGEN</Text>
                                
                            }
                            </TouchableOpacity>


                            {/* BOTONES */}
                            <View style={styless.botonModal}>
                            <View style={styless.panel}>
                                
                                <TouchableOpacity style={stylesBottomSheet.panelButton} onPress={() => { TakePhotoFromCamera(); hideMode(); }}>
                                    <Text style={stylesBottomSheet.panelButtonTitle}>Tomar Foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesBottomSheet.panelButton} onPress={() => { TakePhotoGalery(); hideMode(); }}>
                                    <Text style={stylesBottomSheet.panelButtonTitle}>Abrir Galeria</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesBottomSheet.panelButton}
                                onPress={() => {registerPhoto(); setImageUri(''); }}
                                >
                               <Text style={stylesBottomSheet.panelButtonTitle}>Registrar</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        </Modal>
                    </Portal>
                



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
            </PaperProvider>
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
        display: 'flex',
        flexDirection: 'row',
        
        flexWrap: 'wrap',
        padding: 10,

    },
    cajas:{
        padding: 10,
        
    },
    imagen:{
        width: 165,
        height: 150,
        marginTop: 5,
        marginLeft: 5,
        borderWidth: 1,
        
        borderColor: 'rgba(0,0,0,0.2)'

    }
})
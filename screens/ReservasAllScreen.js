import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react'
import { StyleSheet,  View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Provider as PaperProvider, Modal, Portal, Text, TextInput} from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Colors } from 'react-native-paper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import apiCall from '../services/api';
import Toast from 'react-native-simple-toast';


import { peluqueroStyles } from '../theme/peluqueroTheme';


export  const ReservasAllScreen = ({ navigation}) => {
    
    const navigator = useNavigation();
    
    const [peluqueroElegido,setPeluqueroElegido]=useState(null);
    const [peluqueros, setPeluqueros]=useState([]);
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [descripcion, setDescripcion] = useState('');
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('Ingrese el horario');
    const [precio, setPrecio] = useState('');

    const [idEdit, setIdEdit] = useState('');
    const [aliasUpdate, setAliasUpdate] = useState('');


    const [visible, setVisible] = React.useState(false);
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);



    useEffect(() => {
        console.log('ReservaComponent');
        getDataReserva();
        getDataPeluqueros();
    }, [])
    
    const hideModalNew = () => {
        setVisible(false);
    }


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

      
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);

        let newDataDate=moment(tempDate).format("YYYY-MM-DD HH:mm:ss");
        setFecha(newDataDate);
    };



    const limpiar = () => {
        console.log({nombre, apellido, direccion, telefono});
        setDescripcion('');
        setCliente('');
        setFecha('Ingrese el horario');
        setPrecio('');
      };
      const getDataPeluqueros=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            const dataResponse = await apiCall('GET','select-peluquero-by-name',null,head);
            if(dataResponse.data.status=="success"){
                               
                let tempData=dataResponse.data.dataPeluquero;
                console.log(tempData);
                let dataArrayFixed = tempData.map(item => {
                    return {label:item.nombre,value:item._id};
                });
                setPeluqueros(dataArrayFixed);
            }else{
                console.log(dataResponse.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    const getDataReserva=async()=>{
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

    const postUpdateData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'update-reserva-by-name';
            let dato={alias:aliasUpdate,  nuevoDescripcion:descripcion, nuevoFecha:fecha, nuevoAlias:cliente , nuevoPrecio:precio, nuevoIdPeluquero: peluqueroElegido}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
                
                Toast.showWithGravity('¡Se Actualizo la Reserva!', Toast.LONG, Toast.TOP);
            }else{
                console.log("error");
                console.log(dataResponse.data);
                Toast.showWithGravity('¡No se Actualizo la Reserva!', Toast.LONG, Toast.TOP);

            }
            
        }catch(e){
            console.log(e);
        }
    }
       


    const postDeleteData=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let url = 'delete-reserva-by-name';
            let dato={alias:cliente, _id: idEdit}
            let dataResponse = await apiCall('POST', url, dato, head);
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
                limpiar();
                Toast.showWithGravity('¡Se Elimino la Reserva!', Toast.LONG, Toast.TOP);

            }else{
                console.log("error");
                console.log(dataResponse.data);
                Toast.showWithGravity('¡No se Elimino la Reserva!', Toast.LONG, Toast.TOP);

            }
            
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
        <PaperProvider>
            <View style={styles.titulo}>
                <TouchableOpacity onPress={() => {getDataReserva();}}>
                    <Text style={styles.texto}>Reservas</Text>
                </TouchableOpacity>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ReservaScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView>
                {/* <ReservaDatos /> */}
                {data.length>0 ? 
                    data.map((item, index)=>{
                        return(
                            <View key={index} style={styles.cajas}>
                                <View style={styles.caja}>
                                    <View style={styles.imagen}>
                                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                                    </View>
                                    <View key={index}  style={styles.textoMedio}>
                                        <Text >Cliente: {item.alias} </Text>
                                        <Text >Servicio: {item.descripcion} </Text>
                                        <Text >Fecha: {item.fecha} </Text>
                                    </View>
                                    <View style={styles.imagenDerecha}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setVisible(true);
                                                setDescripcion(item.descripcion);
                                                setCliente(item.alias);
                                                setFecha(item.fecha);
                                                setPrecio(item.precio.toString());
                                                setIdEdit(item._id)
                                                setAliasUpdate(item.alias)
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
                            <View>
                            <View style={peluqueroStyles.titulo}>
                                
                                <Text style={peluqueroStyles.texto}>Reserva</Text> 
                                
                                    <TouchableOpacity onPress={() =>{hideModalNew()}}>

                                        <View style={peluqueroStyles.botonSalir}>
                                            <Text style={peluqueroStyles.botonX}>x</Text>
                                        </View>
                                    </TouchableOpacity>
                                        
                                
                            </View>
{/* asdsahfbsalkjfgsalkfhdwsa */}
                            <View style={{}}>
                                        <View style={styles.cajaTexto}>
                                        
                                            <TextInput
                                                mode='outlined'
                                                label="Descripcion"
                                                placeholder="Ingrese el servicio a realizar"
                                                onChangeText={descripcion => setDescripcion(descripcion)}
                                                value= {descripcion}
                                            />
                                        </View>
                                        <View style={styles.cajaTexto}>
                                            <TextInput
                                                mode='outlined'
                                                label="Cliente"
                                                placeholder="Ingrese el nombre del cliente"
                                                onChangeText={cliente => setCliente(cliente)}
                                                value= {cliente}
                                            />
                                        
                                        </View>
                                        <View style={styles.cajaFecha}>
                                            <View style={styles.cajaFechaTexto}>
                                                <Text style={styles.textoFecha}>Fecha y Hora: </Text>
                                                <Text style={styles.fechaHora}
                                                    onChangeText={fecha => setFecha(fecha)}
                                                    value= {fecha}
                                                    >{fecha}</Text>
                                            </View>
                                            <View style={styles.cajaFechaIconos}>
                                                <View style={styles.iconos}>
                                                    <TouchableOpacity onPress={() => showMode('date')}>
                                                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.iconos}>
                                                    <TouchableOpacity onPress={() => showMode('time')}>
                                                        <Icon name="time-outline" size={40} color="#5856D6"/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                
                                            
                                            
                                        
                                        </View>
                                        <View style={styles.cajaTexto}>
                                            <TextInput
                                                mode='outlined'
                                                label="Precio"
                                                placeholder="Ingrese el precio del servicio"
                                                keyboardType="numeric"
                                                onChangeText={precio => setPrecio(precio)}
                                                value= {precio}
                                            />
                                        
                                        </View>
                                        <View style={styles.cajaTexto}>
                                        {peluqueros ? <DropDownPicker
                                                    placeholder="Selecciona El Peluquero"
                                                    onChangeItem={(e)=>{setPeluqueroElegido(e.value)}}
                                                    globalTextStyle={{fontSize:11}}
                                                    containerStyle={{ height: 42 }}
                                                    style={{height: 42 }}
                                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                                    dropDownMaxHeight={300}
                                                    labelStyle={{ fontSize: 11 }}
                                                    placeholderStyle={{color:"gray", fontSize: 11}}
                                                    value={peluqueros}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start',borderColor:'rgba(0,0,0,0.045)',
                                                    }}
                                                items={peluqueros}
                                            /> 
                                            : null}
                                        </View>
                                    </View>
                                <View style={styles.botonModal}>
                                    <TouchableOpacity onPress={() =>{
                                        postUpdateData(); 
                                        hideModalNew(); 
                                        getDataReserva();
                                        }}>
                                    <View style={styles.boton}>
                                        <Text style={styles.botonText}>Actualizar</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>{
                                        postDeleteData();
                                        hideModalNew(); 
                                        getDataReserva();
                                        }}>
                                    <View style={styles.botonDelete}>
                                        <Text style={styles.botonText}>Eliminar</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </Portal>
                
                
                </ScrollView>
            </PaperProvider>
            {show && (
                <DateTimePicker 
                    testID = 'dateTimePicker'
                    value={date}
                    mode= {mode}
                    is24Hout={true}
                    display= 'default'
                    onChange= {onChange}
                />
            )}

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

    },
    cajaTexto:{
        // backgroundColor: 'green',
        marginTop: 10,
        
        paddingTop: 0,
        marginHorizontal:10
    },
    cajaFecha:{
        // backgroundColor: 'green',
        marginHorizontal:10,
        marginTop: 10,
        paddingTop: 0,
        // flexDirection: 'row'

    },
    cajaFechaTexto:{
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    cajaFechaIconos:{
        // backgroundColor: 'red',
        flexDirection: 'row',
        marginTop: 15,
        alignSelf: 'center'
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
        
    },
    iconos:{
        marginRight: 15,
        marginLeft: 15,
        // backgroundColor: 'purple',
    },
    boton:{
        backgroundColor: '#5856D6',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 100,
        height: 40,
        marginHorizontal: 10,
        
    },
    botonDelete:{
      backgroundColor: 'red',
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 100,
      height: 40,
      marginHorizontal: 40,
    },
    botonText:{
        // backgroundColor: 'blue',
        marginTop: 10,
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        paddingRight:15,
        paddingLeft:15,
  
    },
    botonSalir:{
      marginLeft: 50, 
      marginTop: -30, 
      borderRadius: 100,  
      backgroundColor: 'red', 
      position: 'absolute',
      zIndex:9
    },
    botonX: {
      padding: 5, 
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white'
    },
    botonModal:{
        flexDirection: 'row',
        
    }
});

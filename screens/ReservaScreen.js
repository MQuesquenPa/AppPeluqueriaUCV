import React, { useEffect, useState } from 'react'
import {TouchableOpacity, StyleSheet, Text,  View, ScrollView} from 'react-native'
import apiCall from '../services/api';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core'

export const ReservaScreen = ({navigation}) => {

    useEffect(() => {
        console.log('Reservas');
        getDataInitial();
    }, [])

    const onRegister = () => {
        console.log({descripcion, cliente, precio, fecha, peluqueroElegido});
    }
   

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fecha, setFecha] = useState('Ingrese el horario');
    const [descripcion, setDescripcion] = useState('');
    const [cliente, setCliente] = useState('');
    const [precio, setPrecio] = useState('');



    
    // peluqueroElegido es el id que estoy eligiendo
    const [peluqueroElegido,setPeluqueroElegido]=useState(null);
    const [peluqueros, setPeluqueros]=useState([]);
    

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


    const getDataInitial=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            const dataResponse = await apiCall('GET','select-peluquero-by-name',null,head);
            if(dataResponse.data.status=="success"){
                               
                let tempData=dataResponse.data.dataPeluquero;
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

    const postDataReserva=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            let dato={descripcion:descripcion,fecha:fecha,alias:cliente,precio:precio, idPeluquero:peluqueroElegido}
            const dataResponse = await apiCall('POST','new-reserva-data', dato ,head);
                        
            if(dataResponse.data.status=="success"){
                console.log(dataResponse.data);
            }else{
                console.log("error");
                console.log(dataResponse.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    //   FECHA
    return (
        <>
            <TouchableOpacity 
                style={styles.btnVolver}
                onPress={() => navigation.navigate( 'ReservasAllScreen' )}
            >
                <Icon name={'chevron-back-outline'} size={ 22 } color= { '#030099'} />
                <Text style={styles.textoBtn}>volver</Text>
            </TouchableOpacity>
            <View style={styles.titulo}>
                <Text style={styles.texto}> REGISTRO DE RESERVAS</Text> 
            </View>
        <ScrollView>
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
                
                <Text style={styles.textoFecha}>Fecha y Hora: </Text>

                <Text style={styles.fechaHora}
                 onChangeText={fecha => setFecha(fecha)}
                 value= {fecha}
                >{fecha}</Text>
    
                
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
                        containerStyle={{height:42}}
                        style={{height:42}}
                        globalTextStyle={{fontSize:11}}
                        placeholderStyle={{color:"gray"}}
                        value={peluqueros}
                        itemStyle={{
                            justifyContent: 'flex-start',borderColor:'rgba(0,0,0,0.045)'
                    }}
                    items={peluqueros}
                /> : null}
            </View>
            <View>
                <TouchableOpacity onPress={() =>{postDataReserva()}}>
                <View style={styles.boton}>
                    <Text style={styles.botonText}>Registrar</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>

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
import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, ScrollView  } from 'react-native'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import apiCall from '../services/api';
import Toast from 'react-native-simple-toast';


export const PeluqueroScreen = ({ navigation}) => {
    
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const limpiar = () => {
    console.log({nombre, apellido, direccion, telefono});
    setNombre('');
    setApellido('');
    setDireccion('');
    setTelefono('');
  };

  const postDataPeluquero=async()=>{
    try{
        let head={'Content-Type': 'application/json'};
        let dato={nombre:nombre, apellido:apellido, direccion:direccion, telefono:telefono}
        const dataResponse = await apiCall('POST','new-peluquero-data', dato ,head);
                    
        if(dataResponse.data.status=="success"){
            console.log(dataResponse.data);
            limpiar();
            Toast.showWithGravity('¡Se Registro el Peluquero!', Toast.LONG, Toast.TOP);
        }else{
          console.log("error");
          console.log(dataResponse.data);
          Toast.showWithGravity('¡No se Registro el Peluquero!', Toast.LONG, Toast.TOP);
        }
    }catch(e){
        console.log(e);
    }
  }

    return (
        <>
          <TouchableOpacity 
                style={styles.btnVolver}
                onPress={() => navigation.navigate('PeluquerosAllScreen')}
          >
                <Icon name={'chevron-back-outline'} size={ 22 } color= { '#030099'} />
                <Text style={styles.textoBtn}>volver</Text>
          </TouchableOpacity>
          
          <View style={styles.titulo}>
              <Text style={styles.texto}>REGISTRO DE PELUQUEROS</Text> 
          </View>
          <ScrollView>
              <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Nombre"
                    placeholder="Ingrese el nombre del peluquero"
                    onChangeText={nombre => setNombre(nombre)}
                    value= {nombre}
                />
              </View>
              <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Apellido"
                    placeholder="Ingrese el apellido del peluquero"
                    onChangeText={apellido => setApellido(apellido)}
                    value= {apellido}
                />
              </View>
              <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Direccion"
                    placeholder="Ingrese la direccion del peluquero"
                    onChangeText={direccion => setDireccion(direccion)}
                    value= {direccion}
                />
              </View>
              <View style={styles.cajaTexto}>
                <TextInput
                    mode='outlined'
                    label="Telefono"
                    keyboardType="numeric"
                    placeholder="Ingrese el telefono del producto"
                    onChangeText={telefono => setTelefono(telefono)}
                    value= {telefono}
                />
              </View>
              
              <View>
                <TouchableOpacity onPress={() =>{postDataPeluquero(); navigation.navigate('PeluquerosAllScreen') }}>

                
                <View style={styles.boton}>
                    <Text style={styles.botonText}>Registrar</Text>
                </View>
                </TouchableOpacity>
              </View>
          </ScrollView>

       

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
      left: 5,
      flexDirection: 'row',
  },
  textoBtn:{
      color: '#030099',
      fontSize: 15,
  
  },
  cajaTexto:{
      // backgroundColor: 'green',
      marginTop: 20,
      paddingTop: 0,
      marginHorizontal: 30
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
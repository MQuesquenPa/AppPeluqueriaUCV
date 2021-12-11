import { StyleSheet } from "react-native";

export const peluqueroStyles =  StyleSheet.create({
    titulo: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        
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
    },

    /////////////////////////////
    
      textoboton:{
        borderWidth : 1,
        fontSize: 25,
        textAlign: 'center',
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        color: 'white',
      },
    
      textoBtn:{
          color: '#030099',
          fontSize: 15,
      
      },
      cajaTexto:{
          // backgroundColor: 'green',
          marginTop: 20,
          paddingTop: 0,
          marginHorizontal: 10
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

      boton:{
          backgroundColor: '#5856D6',
          alignItems: 'center',
          marginTop: 20,
          borderRadius: 100,
          height: 40,
          marginHorizontal: 40,
          
      },
      botonDelete:{
        backgroundColor: 'red',
        alignItems: 'center',
        marginTop: 20,
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
      }

})
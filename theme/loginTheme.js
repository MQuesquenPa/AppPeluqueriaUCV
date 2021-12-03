import {StyleSheet} from "react-native";

export const loginStyle =  StyleSheet.create({
    fondo:{

        backgroundColor: 'white',
    },
    formulario:{
        paddingHorizontal: 30,

    },
    title: {
        color: "black",
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20

    },
    label: {
        marginTop: 25,
        color: "white",
        fontWeight: 'bold'
    },
    cajaTexto:{
        marginTop: 10,
    },
    info:{
        flex: 1,
        marginHorizontal: 30,
        marginTop: '5%',
    },
    boton: {
        flexDirection: 'row',
        marginTop: 10

    },
    texto: {
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 5,
        
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
        // textDecorationLine: 'underline',


    }
});
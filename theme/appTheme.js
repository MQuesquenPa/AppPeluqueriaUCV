import { StyleSheet } from "react-native";

export const colores = {
    primary: '#5856D6'

}
  

export const styles =  StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20,
    },
    containerAvatar: {
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 100
    },
    menuContainer: {
        marginVertical: 20,
        marginHorizontal: 50,
        alignItems: 'flex-start'
    },
    menuBoton:{
        marginVertical: 10,
        // backgroundColor: 'red',
        borderRadius: 100,
        
    },
    menuText :{
        marginLeft: 10,
        fontSize: 20,
        color: 'black'
    }
})
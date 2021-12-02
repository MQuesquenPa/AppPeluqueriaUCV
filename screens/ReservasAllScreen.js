import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export  const ReservasAllScreen = ({ navigation}) => {
    
    const navigator = useNavigation();

    return (
        <>
            <View style={styles.titulo}>
                <Text style={styles.texto}>Reservas</Text>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ReservaScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.cajas}>
                <View style={styles.caja}>
                    <View style={styles.imagen}>
                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                    </View>
                    <View style={styles.textoMedio}>
                        <Text>Cliente: Hermelinda Hernandez</Text>
                        <Text>Fecha:  </Text>
                    </View>
                    <View style={styles.imagenDerecha}>
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <Icon name="caret-forward-outline" size={40} color="#5856D6"/>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        marginLeft: '50%'
    },
    cajas:{
        borderRadius : 30,
        marginHorizontal: 10,
        // backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.20)'
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
        
    },
    textoMedio:{
        flex: 2,
        // backgroundColor: 'green',
        alignSelf: "center",
        
    },
    imagenDerecha:{
        
        // backgroundColor: 'red',
        alignSelf: "flex-end",
        marginLeft: '10%'
    }
});

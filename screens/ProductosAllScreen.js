import React, { useEffect } from 'react'
import { View , Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core'
import { loginStyle } from '../theme/loginTheme';

export const ProductosAllScreen = ({ navigation}) => {

    useEffect(() => {
        console.log('Productos')
    }, [])


    return (
        <>
            
            <View style={styles.titulo}>
                <Text style={styles.texto}>Productos</Text>
                
                <View style={styles.iconoBuscar}>
                    <TouchableOpacity onPress={() =>navigation.navigate( 'ProductoScreen' )}>
                            <Icon name="add-circle" size={40} color="#5856D6"/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
            <View style={styles.cajas}>
                <View style={styles.caja}>
                    <View style={styles.imagen}>
                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                    </View>
                    <View style={styles.textoMedio}>
                        <Text>TINTE</Text>
                        <Text>juego </Text>
                        <Text>5 UNID</Text>

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
            </ScrollView>
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
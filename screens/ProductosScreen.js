import React, { useEffect } from 'react'
import { View , Text, StyleSheet} from 'react-native'

export const ProductosScreen = () => {

    useEffect(() => {
        console.log('Productos')
    }, [])


    return (
        <>
            <View style={styles.texto}>
                <Text style={styles.titulo}>Productos</Text>
            </View>  
        </>
    )
}
const styles = StyleSheet.create({
    texto: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
},
    titulo: {
        fontSize: 20
    }
})
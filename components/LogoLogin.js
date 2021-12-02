import React from 'react'
import { Image, View , StyleSheet} from 'react-native'

export const LogoLogin = () => {
    return (
        <View style={styles.caja}>
            <Image 
                source = { require('../img/logo.png') }
                style={styles.logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    caja:{
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo:{
        // backgroundColor: 'red',
        width: 250,
        height: 290,
        // backgroundColor: "red",
        marginBottom: -30
    }
})
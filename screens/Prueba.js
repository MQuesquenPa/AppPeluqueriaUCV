import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { CardAvatar } from '../components/CardAvatar'


export const Prueba = () => {
    return (
        <>
        <View style={styles.container}>
          <ScrollView horizontal={true} style={{width:'100%'}}>
            {this.state.dataArray.map((item,index)=>
                <CardAvatar data={item} key={index}/>
            )}
          </ScrollView>
        </View>  
        </>
    )
}

const styles = StyleSheet.create({
    container:{
      position:'absolute',
      bottom: 0,
      // backgroundColor:'red',
      width:400,
      height:100
    },
    btnAlignment: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
    },
  });
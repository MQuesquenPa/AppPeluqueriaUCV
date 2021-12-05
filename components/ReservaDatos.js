import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

export const ReservaDatos = () => {
    
    useEffect(() => {
        console.log('ReservaComponent');
        getDataInitial();
    }, [])

    const getDataInitial=async()=>{
        try{
            let head={'Content-Type': 'application/json'};
            const dataResponse = await apiCall('GET','select-category-by-name',null,head);
            if(dataResponse.data.status=="success"){
                let tempData=dataResponse.data.dataCategoria;
                console.log(dataResponse.data.dataCategoria);

                let dataArrayFixed = tempData.map(item => {
                    return {label:item.nombre, value:item._id}; 
                });
                setCategorias(dataArrayFixed);
                
            }else{
                console.log(dataResponse.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    
    return (
        <>
            <View style={styles.cajas}>
                <View style={styles.caja}>
                    <View style={styles.imagen}>
                        <Icon name="calendar-outline" size={40} color="#5856D6"/>
                    </View>
                    <View style={styles.textoMedio}>
                        <Text>Cliente: Hermelinda Hernandez </Text>
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
        // alignSelf: "flex-end",
        alignSelf: 'center',
        marginLeft: '10%'

    }
});

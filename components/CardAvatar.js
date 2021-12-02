import React from 'react'
import { Image,  StyleSheet,  TouchableOpacity, View} from 'react-native'

export const CardAvatar = ({data,setArray,dataArray}) => {


    const hanldeState=(valSend)=>{
        let tempData=[...dataArray];
        let dataIndexTemp=parseInt(valSend)-1;
        for(let i=0;tempData.length>i;i++){
            if(i==dataIndexTemp){
                tempData[i].state=true;
            }else{
                tempData[i].state=false;
            }
        }
        setArray(tempData);
    }

    return (
        <>
            <View>
                <TouchableOpacity
                style={styles.boton}
                onPress={() => {hanldeState(data.id)}}
                >
                <Image
                    style = {styles.btnIcon}
                    source={data.imagen}
                />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boton:{
        flex: 1,
        flexDirection: 'column-reverse',
        alignSelf: 'flex-start'
    },
    btnIcon:{
        height: 70,
        width: 70,
        backgroundColor: "white",
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
        bottom: 0,
        marginRight: 10
    }
})
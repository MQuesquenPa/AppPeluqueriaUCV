import React,{useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';

const GlassesFilter = ({  rightEyePosition,  leftEyePosition,  yawAngle,  rollAngle,  leftEarPosition,rightEarPosition,dataArray}) => {
  const renderImageData=()=>{
    let result = dataArray.filter(item => item.state==true);
    return result[0].imagen;
  }

  const renderWidthData=()=>{
    let result = dataArray.filter(item => item.state==true);
    console.log(result[0].ancho);
    return parseInt(result[0].ancho);
  }

  const renderLeftData=()=>{
    let result = dataArray.filter(item => item.state==true);
    console.log(result[0].left);
    return parseInt(result[0].left);
  }

  const renderToptData=()=>{
    let result = dataArray.filter(item => item.state==true);
    console.log(result[0].top);
    return parseInt(result[0].top);
  }

  useEffect(()=>{
      console.log("render"); 
  },[dataArray]);

  return (
    <View>
      <View >
         <Image
         source={renderImageData()}
         style= {{position: 'absolute', 
         width: Math.abs(leftEarPosition.x - rightEarPosition.x) + renderWidthData(), 
          resizeMode: 'contain',  
          transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
          left: rightEarPosition.x - renderLeftData()  , top: rightEarPosition.y - renderToptData()  }}
         

         />
      </View>
      {/* <Image
        source={require('../img/glasses.png')}
        style={styles.glasses({
          rightEyePosition,
          leftEyePosition,
          yawAngle,
          rollAngle,
        })}
      /> */}
    </View>
  );
};

export default GlassesFilter;

const styles = StyleSheet.create({
  glasses: ({rightEyePosition, leftEyePosition, yawAngle, rollAngle}) => {
    const width = Math.abs(leftEyePosition.x - rightEyePosition.x) + 100;
    return {
      position: 'absolute',
      top: rightEyePosition.y - 100,
      left: rightEyePosition.x - 100,
      resizeMode: 'contain',
      width,
      transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
});
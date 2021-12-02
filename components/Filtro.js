import React, {useState, useEffect} from 'react';
import Camera from './Camera';
import {SafeAreaView, TouchableHighlight, Image} from 'react-native';

export const Filtro = () => {
   
  useEffect(() => {
    console.log('filtro')
  }, [])

  const [img, setImg] = useState(null);

  function onPicture({uri}) {
    setImg(uri);
  }

  function onBackToCamera() {
    setImg(null);
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {img ? (
          <TouchableHighlight
            style={{flex: 1}}
            onPress={() => {
              onBackToCamera();
            }}>
            <Image source={{uri: img}} style={{flex: 1}} />
          </TouchableHighlight>
        ) : (
          <Camera onPicture={onPicture} />
        )}
        
      </SafeAreaView>
    </>
  );
};

export default Filtro;


import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Alert, StyleSheet,View,ScrollView} from 'react-native';
import GlassesFilter from './GlassesFilter';
import { CardAvatar } from './CardAvatar';

export default class Camera extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
      box: null,
      leftEyePosition: null,
      rightEyePosition: null,
      leftEarPosition: null,
      rightEarPosition : null,
      dataArray:[
        {id:1,nombre:"peluca", imagen: require('../img/peluca.png'),    top:430, ancho: 100, left: 50, state:true},
        {id:2,nombre:"peluca2" , imagen: require('../img/peluca2.png'), top:232, ancho: 130, left: 65, state:false},
        {id:3,nombre:"peluca3" , imagen: require('../img/peluca3.png'), top:450, ancho: 100, left: 50, state:false},
        {id:4,nombre:"peluca4" , imagen: require('../img/peluca4.png'), top:420, ancho: 150, left: 60, state:false},
        {id:5,nombre:"peluca7" , imagen: require('../img/peluca7.png'), top:200,  ancho: 190, left: 80, state:false},
        {id:6,nombre:"peluca9" , imagen: require('../img/peluca9.png'), top:600,  ancho: 145, left: 80, state:false},
        
        
        {id:7,nombre:"peluca12" , imagen: require('../img/peluca12.png'),  top:280,  ancho: 240, left: 120, state:false},
        {id:8,nombre:"peluca13" , imagen: require('../img/peluca13.png'),  top:250,  ancho: 240, left: 140, state:false},
        {id:9,nombre:"peluca14" , imagen: require('../img/peluca14.png'),  top:210,  ancho: 210, left: 120, state:false},
        {id:10,nombre:"peluca15" , imagen: require('../img/peluca15.png'),  top:150,  ancho: 150, left: 70, state:false},
        {id:11,nombre:"peluca16" , imagen: require('../img/peluca16.png'),  top:230,  ancho: 410, left: 190, state:false},
        {id:12,nombre:"peluca17" , imagen: require('../img/peluca17.png'),  top:270,  ancho: 220, left: 95, state:false},
        {id:13,nombre:"peluca18" , imagen: require('../img/peluca18.png'),  top:310,  ancho: 170, left: 80, state:false},
        
      ]
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({takingPic: false}, () => {
          this.props.onPicture(data);
        });
      } catch (err) {
        this.setState({takingPic: false});
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      }
    }
  };

  onFaceDetected = ({faces}) => {
    if (faces[0]) {
      // console.log(faces[0]);
      this.setState({
        box: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        leftEarPosition: faces[0].leftEarPosition, 
        rightEarPosition : faces[0].rightEarPosition, 
      });
    } else {
      this.setState({
        box: null,
        rightEyePosition: null,
        leftEyePosition: null,
        leftEarPosition: null,
        rightEarPosition: null,
      });
    }
  };

  onSetArray=()=>{
      console.log("test");
  }

  render() {

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={{flex: 1,position:'relative'}}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          type={RNCamera.Constants.Type.front}
          onFacesDetected={this.onFaceDetected}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {this.state.box && (
            <>
              <GlassesFilter
                rightEyePosition={this.state.rightEyePosition}
                leftEyePosition={this.state.leftEyePosition}
                rollAngle={this.state.box.rollAngle}
                yawAngle={this.state.box.yawAngle}
                leftEarPosition = {this.state.leftEarPosition}
                rightEarPosition = {this.state.rightEarPosition}
                dataArray = {this.state.dataArray}
              />
            </>
          )}

        
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnAlignment}
            >
            </TouchableOpacity>
          </RNCamera>
          {/* los botones de las pelucas */}
          <View style={styles.container}>
            <ScrollView horizontal={true} style={{width:'100%'}}>
              {this.state.dataArray.map((item,index)=>
                  <CardAvatar data={item} dataArray = {this.state.dataArray} key={index} setArray= {(dataSend)=>{this.setState({dataArray:dataSend})}}/>
              )}
            </ScrollView>
          </View>
      </View>
    );
  }
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

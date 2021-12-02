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
        {id:1,nombre:"Pcorta", imagen: require('../img/peluca.png'),  top:450, ancho: 80, left: 30, state:true},
        {id:2,nombre:"Plarge" , imagen: require('../img/peluca2.png'), top:220, ancho: 130, left: 60, state:false},
        {id:3,nombre:"PCerq" , imagen: require('../img/peluca3.png'), top:450, ancho: 160, left: 70, state:false},
        {id:4,nombre:"PCua" , imagen: require('../img/peluca4.png'), top:450, ancho: 160, left: 70, state:false},
        {id:5,nombre:"PLa" , imagen: require('../img/Peluca5.png'),  top:30,  ancho: 120, left: 10, state:false},
        {id:6,nombre:"Pas" , imagen: require('../img/Peluca6.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:7,nombre:"Pgrin" , imagen: require('../img/Peluca7.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:8,nombre:"Pqwa" , imagen: require('../img/Peluca8.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:9,nombre:"Pqwa" , imagen: require('../img/Peluca9.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:10,nombre:"Pqwa" , imagen: require('../img/Peluca10.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:11,nombre:"Pqwa" , imagen: require('../img/Peluca11.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:12,nombre:"Pqwa" , imagen: require('../img/Peluca12.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:13,nombre:"Pqwa" , imagen: require('../img/Peluca13.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:14,nombre:"Pqwa" , imagen: require('../img/Peluca14.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:15,nombre:"Pqwa" , imagen: require('../img/Peluca15.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:16,nombre:"Pqwa" , imagen: require('../img/Peluca16.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:18,nombre:"Pqwa" , imagen: require('../img/Peluca18.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:19,nombre:"Pqwa" , imagen: require('../img/Peluca19.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:20,nombre:"Pqwa" , imagen: require('../img/Peluca20.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:21,nombre:"Pqwa" , imagen: require('../img/Peluca21.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:22,nombre:"Pqwa" , imagen: require('../img/Peluca22.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:23,nombre:"Pqwa" , imagen: require('../img/Peluca23.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:24,nombre:"Pqwa" , imagen: require('../img/Peluca24.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:25,nombre:"Pqwa" , imagen: require('../img/Peluca25.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:26,nombre:"Pqwa" , imagen: require('../img/Peluca26.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:27,nombre:"Pqwa" , imagen: require('../img/Peluca27.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:28,nombre:"Pqwa" , imagen: require('../img/Peluca28.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:29,nombre:"Pqwa" , imagen: require('../img/Peluca29.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:30,nombre:"Pqwa" , imagen: require('../img/Peluca30.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:31,nombre:"Pqwa" , imagen: require('../img/Peluca31.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:32,nombre:"Pqwa" , imagen: require('../img/Peluca32.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:33,nombre:"Pqwa" , imagen: require('../img/Peluca33.png'),  top:40,  ancho: 120, left: 10, state:false},
        {id:34,nombre:"Pqwa" , imagen: require('../img/Peluca34.png'),  top:40,  ancho: 120, left: 10, state:false},

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

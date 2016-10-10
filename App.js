import React, { Component } from 'react';
import {
  BackAndroid,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

const CameraButton = (props) => {
  const buttonTextStyle = props.buttonTextStyle || styles.buttonText;
  const buttonStyle = props.style || styles.button;

  return (
    <TouchableHighlight {...props} style={buttonStyle}>
      <Text style={buttonTextStyle}>[{props.text}]</Text>
    </TouchableHighlight>
  );
};

class BadInstagramCloneApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      hasPhoto: false,
    };
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
  }

  onBack() {
    if (this.state.photo) {
      this.hidePicture();
      return true;
    }
    return false;
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.data = data;
        console.log('camera: take picture', this.data);
        this.setState({
          hasPhoto: (this.data && this.data.path),
        });
      })
      .catch(err => console.error('camera: take picture error', err));
  }

  showPicture() {
    if (this.data && this.data.path) {
      console.log('camera: show picture', this.data.path);
      this.setState({
        photo: this.data.path,
      });
    }
  }

  hidePicture() {
    this.setState({
      photo: null,
    });
  }

  render() {
    const showLastButton = (
      <CameraButton text="SHOW LAST" onPress={this.showPicture.bind(this)} />
    );

    const cameraView = (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <View style={styles.buttonsContainer}>
          <CameraButton text="CAPTURE" onPress={this.takePicture.bind(this)} />
          {(this.state.hasPhoto) ? showLastButton : null}
        </View>
      </Camera>
    );

    const photoView = (
      <Image style={styles.preview} source={{ uri: this.state.photo }}>
        <View style={styles.buttonsContainer}>
          <CameraButton text="BACK TO CAMERA" onPress={this.hidePicture.bind(this)} />
        </View>
      </Image>
    )
    return (
      <View style={styles.container}>
        {(this.state.photo) ? photoView : cameraView }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: Dimensions.get('window').height - StatusBar.currentHeight,
    width: Dimensions.get('window').width,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  button: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  }
});

export default BadInstagramCloneApp;

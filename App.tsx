import {StyleSheet, Text, Button, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import Video from 'react-native-video';
const App = () => {
  const [imgPath, setimgPath] = useState<string | undefined>(undefined);
  const [videoPath, setvideoPath] = useState<any>(undefined);

  const devices = useCameraDevices();
  const device = devices.back;
  const [style, setstyle] = useState<any>({width: 300, height: 300});
  const camera = useRef<Camera>(null);

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto({
      flash: 'on',
    });
    setimgPath(photo?.path);
    setstyle({height: photo?.height, width: '100%'});
  };

  const takeVideo = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    camera.current?.startRecording({
      flash: 'on',

      onRecordingFinished: video => setvideoPath(video.path),
      onRecordingError: error => console.error(error),
    });
  };

  const stopVideo = async () => {
    await camera.current?.stopRecording();
  };

  if (device == null) return <Text>Salam</Text>;
  return (
    <>
      {videoPath ? (
        <>
          {/* <Image
            style={{width: 100, height: 100}}
            source={{
              uri: 'file://' + imgPath,
            }}
          /> */}
          <Video
            source={videoPath} // the video file
            paused={false} // make it start
            style={styles.backgroundVideo} // any style you want
            repeat={true} // make it a loop
          />
        </>
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            // photo={true}
            video={true}
            audio={true}
          />
          <Button title="take photo" onPress={takePhoto}></Button>
          <Button title="take video" onPress={takeVideo}></Button>
          <Button title="stop video" onPress={stopVideo}></Button>
        </>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 200,
    height: 200,
  },
});

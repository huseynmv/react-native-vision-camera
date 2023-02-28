import {StyleSheet, Text, Button, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';

const App = () => {
  const [imgPath, setimgPath] = useState<string | undefined>(undefined);
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

  if (device == null) return <Text>Salam</Text>;
  return (
    <>
      {imgPath == undefined ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <Button title="take photo" onPress={takePhoto}></Button>
        </>
      ) : (
        <>
          <Image
            style={style}
            source={{
              uri: 'file://' + imgPath,
            }}
          />
        </>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});

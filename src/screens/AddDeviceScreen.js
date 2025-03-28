/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native-ui-lib';
import React, {useRef} from 'react';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import {nav} from '../navigation/navName';
import {navigationTo} from './HomeScreen';

const AddDeviceScreen = () => {
  const camera = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices[0];

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes?.length > 0) {
        navigationTo(nav.home, {
          from: nav.addDevice,
          data: {
            token: codes[0].value,
          },
        });
      }
    },
  });

  return (
    <View center flex>
      <Camera
        ref={camera}
        style={{width: 200, height: 200}}
        preview={true}
        isActive={true}
        resizeMode="cover"
        captureAudio={true}
        device={device}
        codeScanner={codeScanner}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Okay',
          buttonNegative: 'Cancel',
        }}
      />
    </View>
  );
};

export default AddDeviceScreen;

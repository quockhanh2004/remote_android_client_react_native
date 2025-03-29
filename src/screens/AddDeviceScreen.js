/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native-ui-lib';
import {View} from 'react-native';
import React, {useRef} from 'react';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import {nav} from '../navigation/navName';
import {navigationTo} from './HomeScreen';
import {useRoute} from '@react-navigation/native';

const AddDeviceScreen = () => {
  const camera = useRef(null);
  const route = useRoute();
  const {isUpdate} = route.params;
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
            isUpdate: isUpdate,
          },
        });
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 12,
      }}>
      <Text color="white" size={24} marginT-20 text60BL>
        Quét QR FCM Token của thiết bị
      </Text>
      <Camera
        ref={camera}
        style={{width: 300, height: 300}}
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

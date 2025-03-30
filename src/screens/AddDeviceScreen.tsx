/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native-ui-lib';
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
  const route = useRoute<any>();
  const isUpdate = route.params?.isUpdate;
  const devices = useCameraDevices();
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
    <View flex gap-12 center bg-black useSafeArea>
      <Text color="white" marginT-20 text60BL>
        Quét QR FCM Token của thiết bị
      </Text>
      <Camera
        ref={camera}
        style={{width: 300, height: 300, position: 'relative'}}
        preview={true}
        isActive={true}
        resizeMode="cover"
        device={device}
        codeScanner={codeScanner}
      />
    </View>
  );
};

export default AddDeviceScreen;

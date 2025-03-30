import {PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      console.log('sdk: ' + Platform.Version);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } else if (Platform.OS === 'ios') {
      const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);

      if (cameraStatus === RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Camera permission denied after request');
        return false;
      }
    } else {
      console.log('Not Android or IOS');
      return false;
    }
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

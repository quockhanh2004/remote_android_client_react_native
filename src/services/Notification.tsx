import {useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import {useDispatch} from 'react-redux';
import {setMessaging} from '../redux/slice/messaging.slice';

const messaging = getMessaging(getApp());

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('⚠️ Người dùng từ chối quyền thông báo');
      return;
    }
  }
  console.log('✅ Quyền thông báo được cấp');
};

export const NotificationService = () => {
  const dispatch = useDispatch();

  //nhận thông báo trong app với fcm
  onMessage(messaging, remoteMessage => {
    console.log('Received FCM message: ', JSON.stringify(remoteMessage));
    setData(remoteMessage.data);
  });
  const setData = (data: any) => {
    dispatch(
      setMessaging({
        message: data,
      }),
    );
  };
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return null;
};

export const getFcmToken = async (): Promise<string> => {
  const fcmToken = await getToken(messaging);
  console.log('FcmToken: ' + fcmToken);
  return fcmToken;
};

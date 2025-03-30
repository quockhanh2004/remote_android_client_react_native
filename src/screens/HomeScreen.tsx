/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Colors, Icon, TouchableOpacity, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDevice,
  addMyToken,
  getListDevices,
  updateDevice,
} from '../redux/action/devices.action';
import DeviceList from './DeviceList';
import MainButton from '../components/MainButton';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {nav} from '../navigation/navName';
import {requestCameraPermission} from '../utils/permission';
import EditTextDialog from '../dialog/EditTextDialog';
import {getFcmToken} from '../services/Notification';
import {AppDispatch, RootState} from '../redux/store';
import {DeviceModel} from '../model/device.model';

let navigation: NavigationProp<any>;
const HomeScreen = () => {
  navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();

  const [localUpdateDevice, setUpdateDevice] = useState<DeviceModel | any>(
    null,
  );
  const [visibleUpdateDevice, setVisibleUpdateDevice] = useState(false);

  const {devices, isLoading, defaultDevice} = useSelector(
    (state: RootState) => state.devices,
  );

  const [dataAdd, setDataAdd] = useState<DeviceModel | any>(null);
  const handleReload = () => {
    dispatch(getListDevices());
  };

  const handleAddDevice = async () => {
    await requestCameraPermission();
    navigationTo(nav.addDevice);
  };

  const handleRequestAddDevice = async (name: string, token: string) => {
    dispatch(
      addDevice({
        deviceName: name,
        fcmTokenDevice: token,
      }),
    );
    setDataAdd(null);
  };

  const handleRegisToken = async () => {
    const token = await getFcmToken();

    if (token) {
      dispatch(addMyToken(token));
    }
  };

  const handleUpdateDevice = (device: DeviceModel) => {
    dispatch(updateDevice(device));
  };

  useEffect(() => {
    dispatch(getListDevices());
    handleRegisToken();
    if (defaultDevice) {
      navigationTo(nav.deviceDetail, {device: defaultDevice});
    }
  }, []);

  useEffect(() => {
    if (route.params?.from === nav.addDevice && route.params?.data) {
      if (route.params?.data?.isUpdate) {
        console.log('route.params?.data?.token', route.params?.data?.token);

        setUpdateDevice({
          ...localUpdateDevice,
          fcmTokenDevice: route.params?.data?.token,
        });
        setVisibleUpdateDevice(true);
      } else {
        setDataAdd(route.params.data);
      }

      if (route.params.data !== undefined) {
        navigation.setParams(undefined);
      }
    }
  }, [route.params]);

  return (
    <View center padding-20 bg-black flex>
      <View width={'100%'}>
        <TouchableOpacity right onPress={handleAddDevice}>
          <Icon
            assetGroup="icons"
            assetName="ic_add"
            size={32}
            tintColor={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <DeviceList
        devices={devices}
        onUpdateDevice={device => {
          setUpdateDevice(device);
          setVisibleUpdateDevice(true);
        }}
      />
      <MainButton
        onPress={handleReload}
        label={'Reload'}
        isLoading={isLoading}
      />
      <EditTextDialog
        visible={dataAdd}
        value=""
        value2={dataAdd?.token || ''}
        placeholder="Device name"
        placeholder2="Token device"
        onConfirm={handleRequestAddDevice}
        onDismiss={() => {
          setDataAdd(null);
        }}
        label={''}
        isLoading={false}
      />
      <EditTextDialog
        visible={visibleUpdateDevice}
        value={localUpdateDevice?.deviceName ?? ''}
        value2={localUpdateDevice?.fcmTokenDevice}
        isUpdate={true}
        onDismiss={() => {
          setUpdateDevice(null);
          setVisibleUpdateDevice(false);
        }}
        onScanQR={() => {
          navigationTo(nav.addDevice, {
            isUpdate: true,
          });
          setUpdateDevice({
            ...localUpdateDevice,
            fcmTokenDevice: '',
          });
          setVisibleUpdateDevice(false);
        }}
        label={'Update Device'}
        isLoading={false}
        onConfirm={(text, text2) => {
          if (localUpdateDevice) {
            handleUpdateDevice({
              ...localUpdateDevice,
              deviceName: text,
              fcmTokenDevice: text2 ? text2 : '',
            });
            setUpdateDevice(null);
          }
        }}
      />
    </View>
  );
};

// Hàm điều hướng toàn cục
export const navigationTo = (to: string, data?: any) => {
  if (navigation) {
    navigation.navigate(to, data);
  } else {
    console.warn('Navigation chưa được khởi tạo');
  }
};

export default HomeScreen;

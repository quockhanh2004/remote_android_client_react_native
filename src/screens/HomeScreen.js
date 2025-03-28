/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Colors, Icon, TouchableOpacity, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDevice,
  addMyToken,
  getListDevices,
} from '../redux/action/devices.action';
import DeviceList from './DeviceList';
import MainButton from '../components/MainButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {nav} from '../navigation/navName';
import {requestCameraPermission} from '../utils/permission';
import EditTextDialog from '../dialog/EditTextDialog';
import {getFcmToken} from '../services/Notification';

let navigation;
const HomeScreen = () => {
  navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {devices, isLoading} = useSelector(state => state.devices);

  const [dataAdd, setDataAdd] = useState(null);
  const handleReload = () => {
    dispatch(getListDevices());
  };

  const handleAddDevice = async () => {
    await requestCameraPermission();
    navigationTo(nav.addDevice);
  };

  const handleRequestAddDevice = async (name, token) => {
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

  useEffect(() => {
    dispatch(getListDevices());
    handleRegisToken();
  }, []);

  useEffect(() => {
    if (route.params?.from === nav.addDevice && route.params?.data) {
      console.log('route.params.data', route.params.data);

      setDataAdd(route.params.data);

      if (route.params.data !== undefined) {
        navigation.setParams({data: undefined});
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
      <DeviceList devices={devices} />
      <MainButton
        onPress={handleReload}
        label={'Reload'}
        isLoading={isLoading}
      />
      <EditTextDialog
        visible={dataAdd}
        value=""
        value2={dataAdd?.token}
        placeholder="Device name"
        placeholder2="Token device"
        onConfirm={handleRequestAddDevice}
      />
    </View>
  );
};

// Hàm điều hướng toàn cục
export const navigationTo = (to, data) => {
  if (navigation) {
    navigation.navigate(to, data);
  } else {
    console.warn('Navigation chưa được khởi tạo');
  }
};

export default HomeScreen;

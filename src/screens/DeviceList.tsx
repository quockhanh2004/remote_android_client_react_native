/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Colors, Text, TouchableOpacity, Drawer} from 'react-native-ui-lib';
import {DeviceModel} from '../model/device.model';
import {FlatList, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {nav} from '../navigation/navName';
import {useDispatch, useSelector} from 'react-redux';
import {setDefaultDevice} from '../redux/slice/devices.slice'; // Thêm action removeDevice
import {RootState} from '../redux/store';
import {removeDevice} from '../redux/action/devices.action';

type RootStackParamList = {
  [nav.deviceDetail]: {device: DeviceModel};
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof nav.deviceDetail
>;

interface DeviceListProps {
  devices: DeviceModel[];
  onUpdateDevice: (device: DeviceModel) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({devices, onUpdateDevice}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<NavigationProp>();
  const {defaultDevice} = useSelector((state: RootState) => state.devices);

  const handlePressDevice = (device: DeviceModel) => {
    navigation.navigate(nav.deviceDetail, {device});
  };

  const handleSetDefault = (device: DeviceModel) => {
    if (!defaultDevice || defaultDevice !== device) {
      dispatch(setDefaultDevice(device));
      ToastAndroid.show(
        `Đã set ${device.deviceName} thành mặc định`,
        ToastAndroid.SHORT,
      );
    } else {
      dispatch(setDefaultDevice(null));
      ToastAndroid.show(
        `Đã xóa ${device.deviceName} khỏi mặc định`,
        ToastAndroid.SHORT,
      );
    }
  };

  const handleRemoveDevice = (device: DeviceModel) => {
    dispatch(removeDevice(device.id));
    ToastAndroid.show(
      `Đã xóa thiết bị ${device.deviceName}`,
      ToastAndroid.SHORT,
    );
  };

  return (
    <>
      <FlatList
        style={{width: '100%', marginBottom: 10}}
        data={devices}
        inverted={true}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <Drawer
            rightItems={[
              {
                text: 'Xóa',
                background: Colors.red30,
                onPress: () => handleRemoveDevice(item),
              },
            ]}
            leftItem={{
              text: 'Mặc định',
              background: Colors.green30,
              onPress: () => handleSetDefault(item),
            }}>
            <TouchableOpacity
              onPress={() => handlePressDevice(item)}
              onLongPress={() => onUpdateDevice(item)}
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderBlockColor: Colors.grey30,
              }}>
              <Text text70 white>
                {item.deviceName}
              </Text>
              <Text text70 white>
                {item.fcmTokenDevice.slice(-12)}
              </Text>
            </TouchableOpacity>
          </Drawer>
        )}
      />
    </>
  );
};

export default DeviceList;

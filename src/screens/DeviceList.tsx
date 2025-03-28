/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Colors, Text, TouchableOpacity} from 'react-native-ui-lib';
import {DeviceModel} from '../model/device.model';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {nav} from '../navigation/navName';

// Định nghĩa RootStackParamList để TypeScript hiểu kiểu params
type RootStackParamList = {
  [nav.deviceDetail]: {device: DeviceModel};
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof nav.deviceDetail
>;

interface DeviceListProps {
  devices: DeviceModel[];
}

const DeviceList: React.FC<DeviceListProps> = ({devices}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressDevice = (device: DeviceModel) => {
    navigation.navigate(nav.deviceDetail, {device});
  };

  return (
    <FlatList
      style={{width: '100%', marginBottom: 10}}
      data={devices}
      inverted={true}
      keyExtractor={item => item?.id} // Thay key bằng unique id
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handlePressDevice(item)}
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
      )}
    />
  );
};

export default DeviceList;

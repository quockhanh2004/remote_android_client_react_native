/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Card, Icon, Colors, Button} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {executeCommand} from '../redux/action/devices.action';
import {Command} from '../utils/Command';
import {nav} from '../navigation/navName';
import {navigationTo} from './HomeScreen';
import {ScrollView} from 'react-native';

const DeviceDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.devices);
  const route = useRoute();
  const device = route.params?.device;

  const handleExecuteCommand = command => {
    dispatch(executeCommand({command, deviceId: device.id}));
  };

  if (!device) {
    return (
      <View flex center>
        <Text text70>Device not found</Text>
      </View>
    );
  }

  return (
    <View flex padding-16 backgroundColor="#121212">
      <View row spread>
        <View>
          <Text text60 white marginB-12>
            {device.deviceName}
          </Text>
          <Text text70 white marginB-20>
            Token: {device.fcmTokenDevice.slice(-12)}
          </Text>
        </View>
        <Button
          label="xem log"
          size={'medium'}
          onPress={() => {
            navigationTo(nav.log, {
              deviceId: device.id,
              deviceName: device.deviceName,
            });
          }}
        />
      </View>

      <View marginT-20>
        <Button
          label="Nhập lệnh thủ công"
          onPress={() => {
            navigationTo(nav.command, {deviceId: device.id});
          }}
        />
      </View>

      <View flex>
        <View flex />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-end', // Đẩy các item xuống dưới
            }}>
            {commands.map((item, index) => (
              <Card
                key={index}
                margin-8
                padding-16
                backgroundColor={item.backgroundColor || '#1E88E5'}
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen, {deviceId: device.id});
                  } else {
                    handleExecuteCommand(item.command);
                  }
                }}
                disabled={isLoading}
                center
                borderRadius={12}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  assetGroup="icons"
                  assetName={item.icon}
                  size={40}
                  tintColor={Colors.white}
                />
                <Text
                  white
                  marginT-8
                  text70BL
                  center
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {item.label}
                </Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DeviceDetail;
const commands = [
  {label: 'Mute', command: Command.mute_toggle, icon: 'ic_mute'},
  {label: 'Volume Down', command: Command.volume_down, icon: 'ic_volume_down'},
  {label: 'Volume Up', command: Command.volume_up, icon: 'ic_volume_up'},
  {label: 'Previous Track', command: Command.prev_track, icon: 'ic_prev_track'},
  {label: 'Play/Pause', command: Command.play_pause, icon: 'ic_play_pause'},
  {label: 'Next Track', command: Command.next_track, icon: 'ic_next_track'},
  {label: 'Stop', command: Command.stop_music, icon: 'ic_stop'},

  {
    label: 'Flash On',
    command: Command.turn_on_flash,
    icon: 'ic_flash',
    backgroundColor: Colors.yellow20,
  },
  {
    label: 'Flash Off',
    command: Command.turn_off_flash,
    icon: 'ic_flash_off',
    backgroundColor: Colors.grey30,
  },
  {
    label: 'Hotspot On',
    command: Command.enable_hotspot,
    icon: 'ic_hotspot',
    backgroundColor: Colors.green40,
  },
  {label: 'Call', screen: nav.contact, icon: 'ic_contact'},
  {
    label: 'End Call',
    command: Command.end_call,
    icon: 'ic_deny_call',
    backgroundColor: Colors.red40,
  },
  {label: 'Accept Call', command: Command.accept_call, icon: 'ic_call'},
];

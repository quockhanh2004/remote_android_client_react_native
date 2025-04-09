/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Card,
  Icon,
  Colors,
  Button,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {executeCommand} from '../redux/action/devices.action';
import {COMMAND} from '../utils/Command';
import {nav} from '../navigation/navName';
import {navigationTo} from './HomeScreen';
import {ScrollView} from 'react-native';
import EditTextDialog from '../dialog/EditTextDialog';
import {AppDispatch, RootState} from '../redux/store';

interface ActionButton {
  label: string;
  command?: string;
  icon: string;
  backgroundColor?: string;
  screen?: string;
  dialog?: string;
}

const DeviceDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state: RootState) => state.devices);
  const {battery, flash} = useSelector((state: RootState) => state.messaging);
  const route = useRoute<any>();
  const device = route.params?.device;

  const [visibleSpotifyLink, setVisibleSpotifyLink] = useState(false);
  const [listAction, setListAction] = useState<ActionButton[]>([]);

  const handleConfirmPlaySpotify = (link: string) => {
    handleExecuteCommand(COMMAND.start_intent + link);
    setVisibleSpotifyLink(false);
  };

  const handleExecuteCommand = useCallback(
    (command: string) => {
      dispatch(executeCommand({command, deviceId: device.id}));
    },
    [device.id, dispatch],
  );

  useEffect(() => {
    // Tìm danh sách hành động điều khiển flash phù hợp
    let findFlash;

    if (flash) {
      findFlash = flashs.find(item => item.command === COMMAND.turn_off_flash);
    } else {
      findFlash = flashs.find(item => item.command === COMMAND.turn_on_flash);
    }

    // Nếu không tìm thấy thì fallback bằng cách tạo thủ công
    if (!findFlash) {
      findFlash = {
        label: flash ? 'Flash Off' : 'Flash On',
        command: flash ? COMMAND.turn_off_flash : COMMAND.turn_on_flash,
        icon: 'ic_flash',
        backgroundColor: Colors.yellow20,
      };
    }

    // Tạo danh sách hành động mới
    const flashCommand = [findFlash];
    setListAction([...flashCommand, ...commands]);
  }, [flash, device.id]);

  useEffect(() => {
    handleExecuteCommand('dumpsys battery | grep level');
  }, [device.id]);

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
          <Text text70 white>
            Token: {device.fcmTokenDevice.slice(-12)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleExecuteCommand('dumpsys battery | grep level');
            }}>
            <Text text70 white marginB-20>
              Battery: {battery}%
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          label="View Log"
          size={'medium'}
          onPress={() => {
            navigationTo(nav.log, {
              deviceId: device.id,
              deviceName: device.deviceName,
            });
          }}
          bg-blue40
          marginV-12
        />
      </View>

      <View marginT-20>
        <Button
          label="Type Commands"
          bg-red20
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
            {listAction.map((item, index) => (
              <Card
                key={index}
                margin-8
                padding-16
                backgroundColor={item.backgroundColor || '#1E88E5'}
                onPress={() => {
                  if (item.screen) {
                    navigationTo(item.screen, {deviceId: device.id});
                  }
                  if (item.dialog) {
                    setVisibleSpotifyLink(true);
                  } else if (item.command) {
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
      <EditTextDialog
        hideText2={true}
        visible={visibleSpotifyLink}
        onDismiss={() => {
          setVisibleSpotifyLink(false);
        }}
        label="Link Spotify"
        placeholder="Paste link Spotify"
        onConfirm={handleConfirmPlaySpotify}
        customTextButton="Play"
        isLoading={false}
      />
    </View>
  );
};

export default DeviceDetail;
const commands = [
  {
    label: 'Spotify',
    icon: 'ic_spotify',
    backgroundColor: '#1ed760', // màu gốc Spotify
    dialog: 'Spotify',
  },
  {
    label: 'Hotspot On',
    command: COMMAND.enable_hotspot,
    icon: 'ic_hotspot',
    backgroundColor: Colors.orange30, // đổi sang cam nhẹ, dễ nhận
  },
  {
    label: 'Mute',
    command: COMMAND.mute_toggle,
    icon: 'ic_mute',
    backgroundColor: Colors.grey30,
  },
  {
    label: 'Volume Down',
    command: COMMAND.volume_down,
    icon: 'ic_volume_down',
    backgroundColor: Colors.blue60,
  },
  {
    label: 'Volume Up',
    command: COMMAND.volume_up,
    icon: 'ic_volume_up',
    backgroundColor: Colors.blue40,
  },
  {
    label: 'Previous Track',
    command: COMMAND.previous_track,
    icon: 'ic_prev_track',
    backgroundColor: Colors.violet30,
  },
  {
    label: 'Play/Pause',
    command: COMMAND.play_pause,
    icon: 'ic_play_pause',
    backgroundColor: Colors.violet50,
  },
  {
    label: 'Next Track',
    command: COMMAND.next_track,
    icon: 'ic_next_track',
    backgroundColor: Colors.violet30,
  },
  {
    label: 'Stop',
    command: COMMAND.stop_music,
    icon: 'ic_stop',
    backgroundColor: Colors.red40,
  },
  {
    label: 'Contact',
    screen: nav.contact,
    icon: 'ic_contact',
    backgroundColor: Colors.blue20,
  },
  {
    label: 'End Call',
    command: COMMAND.end_call,
    icon: 'ic_deny_call',
    backgroundColor: Colors.red50,
  },
  {
    label: 'Accept Call',
    command: COMMAND.accept_call,
    icon: 'ic_call',
    backgroundColor: Colors.green40,
  },
];

const flashs = [
  {
    label: 'Turn on flash',
    command: COMMAND.turn_on_flash,
    icon: 'ic_flash_off',
    backgroundColor: Colors.grey20, // khi chưa bật
  },
  {
    label: 'Turn off flash',
    icon: 'ic_flash',
    command: COMMAND.turn_off_flash,
    backgroundColor: Colors.yellow30, // khi đã bật
  },
];

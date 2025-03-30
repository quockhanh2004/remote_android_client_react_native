/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Card, Icon, Colors, Button} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {executeCommand} from '../redux/action/devices.action';
import {Command} from '../utils/Command';
import {nav} from '../navigation/navName';
import {navigationTo} from './HomeScreen';
import {ScrollView} from 'react-native';
import EditTextDialog from '../dialog/EditTextDialog';
import {AppDispatch, RootState} from '../redux/store';

const DeviceDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state: RootState) => state.devices);
  const {battery} = useSelector((state: RootState) => state.messaging);
  const route = useRoute<any>();
  const device = route.params?.device;

  const [visibleSpotifyLink, setVisibleSpotifyLink] = useState(false);

  const handleConfirmPlaySpotify = (link: string) => {
    handleExecuteCommand(Command.start_intent + link);
  };

  const handleExecuteCommand = useCallback(
    (command: string) => {
      dispatch(executeCommand({command, deviceId: device.id}));
    },
    [device.id, dispatch],
  );

  useEffect(() => {
    handleExecuteCommand('dumpsys battery | grep level');
  }, [device.id, handleExecuteCommand]);

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
          <Text text70 white marginB-20>
            Battery: {battery}%
          </Text>
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
            {commands.map((item, index) => (
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
    backgroundColor: '#1ed760',
    dialog: 'Spotify',
  },
  {label: 'Mute', command: Command.mute_toggle, icon: 'ic_mute'},
  {label: 'Volume Down', command: Command.volume_down, icon: 'ic_volume_down'},
  {label: 'Volume Up', command: Command.volume_up, icon: 'ic_volume_up'},
  {
    label: 'Previous Track',
    command: Command.previous_track,
    icon: 'ic_prev_track',
  },
  {label: 'Play/Pause', command: Command.play_pause, icon: 'ic_play_pause'},
  {label: 'Next Track', command: Command.next_track, icon: 'ic_next_track'},
  {
    label: 'Stop',
    command: Command.stop_music,
    icon: 'ic_stop',
    backgroundColor: Colors.red40,
  },

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
  {label: 'Contact', screen: nav.contact, icon: 'ic_contact'},
  {
    label: 'End Call',
    command: Command.end_call,
    icon: 'ic_deny_call',
    backgroundColor: Colors.red40,
  },
  {label: 'Accept Call', command: Command.accept_call, icon: 'ic_call'},
];

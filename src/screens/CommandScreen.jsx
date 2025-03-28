/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, FlatList} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import MainButton from '../components/MainButton';
import MainInput from '../components/MainInput';
import {executeCommand} from '../redux/action/devices.action';

const CommandScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {deviceId} = route.params;

  const flatListRef = useRef(null);
  const [command, setCommand] = useState('');

  const messaging = useSelector(state => state.messaging.messaging) || [];

  const handleSendCommand = () => {
    console.log(command);

    if (command.trim()) {
      dispatch(executeCommand({command, deviceId}));
      setCommand('');
    }
  };

  const filteredMessages = messaging
    .filter(msg => msg.deviceId === deviceId)
    .sort((a, b) => (a.timeStamp ?? 0) - (b.timeStamp ?? 0));

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100); // Đợi một chút để FlatList render hoàn chỉnh
    }
  }, [filteredMessages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1, backgroundColor: 'black'}}>
      <View flex padding-20>
        <MainInput
          value={command}
          onChangeText={setCommand}
          placeholder="Nhập lệnh..."
          placeholderTextColor="gray"
        />
        <View flex marginV-10>
          {filteredMessages.length === 0 ? (
            <Text text70 color="gray">
              Không có log nào.
            </Text>
          ) : (
            <FlatList
              ref={flatListRef}
              data={filteredMessages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View marginV-8 padding-10 backgroundColor="#1E1E1E" br20>
                  <Text text70M color="white">
                    {item.response}
                  </Text>
                  <Text text80 color="gray">
                    {new Date(item.timeStamp || 0).toLocaleString()}
                  </Text>
                </View>
              )}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
              keyboardShouldPersistTaps="always" // Cho phép bấm ngoài để ẩn bàn phím
            />
          )}
        </View>
        <MainButton label="Gửi Lệnh" onPress={handleSendCommand} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommandScreen;

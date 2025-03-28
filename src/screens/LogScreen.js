import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {clearMessaging} from '../redux/slice/messaging.slice';

const LogScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {deviceId, deviceName} = route.params;
  const flatListRef = useRef(null);

  const messaging = useSelector(state => state.messaging.messaging) || [];

  // Lọc tin nhắn theo deviceId và sắp xếp theo thời gian từ cũ đến mới
  const filteredMessages = messaging
    .filter(msg => msg.deviceId === deviceId)
    .sort((a, b) => (a.timeStamp ?? 0) - (b.timeStamp ?? 0));

  // Scroll xuống cuối khi danh sách thay đổi
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [filteredMessages]);

  return (
    <View flex padding-16 backgroundColor="#121212">
      {/* Header */}
      <View row spread marginB-10>
        <Text text60 color="white">
          Log của thiết bị: {deviceName}
        </Text>
        <Button
          label="Xóa Log"
          onPress={() => dispatch(clearMessaging(deviceId))}
          backgroundColor="red"
        />
      </View>

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
          onLayout={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({animated: true});
            }, 100);
          }}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({animated: true});
          }}
        />
      )}
    </View>
  );
};

export default LogScreen;

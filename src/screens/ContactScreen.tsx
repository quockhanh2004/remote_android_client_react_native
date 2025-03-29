/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TextInput,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {executeCommand} from '../redux/action/devices.action';
import {Command} from '../utils/Command';
import {
  Button,
  FloatingButton,
  Icon,
  View,
  Text,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';

interface Contact {
  recordID: string;
  displayName: string;
  phoneNumbers: {number: string}[];
}

interface RouteParams {
  deviceId: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchText, setSearchText] = useState('');
  const [dialNumber, setDialNumber] = useState('');
  const [showDialPad, setShowDialPad] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute();
  const {deviceId} = route.params as RouteParams;

  function removeDiacritics(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  useEffect(() => {
    const requestContactsPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Contacts permission denied');
          return;
        }
      }
      Contacts.getAll()
        .then(contactList => {
          // Lọc bỏ danh bạ không có số điện thoại
          const validContacts = contactList.filter(
            contact => contact.phoneNumbers.length > 0,
          );

          // Sắp xếp danh bạ theo bảng chữ cái (bỏ dấu)
          const sortedContacts = validContacts.sort((a, b) =>
            a.displayName.localeCompare(b.displayName, 'vi', {
              sensitivity: 'base',
            }),
          );

          const groupedContacts: Contact[] = [];
          let currentLetter = '';

          sortedContacts.forEach(contact => {
            const firstLetter = contact.displayName.charAt(0).toUpperCase();

            // Nếu ký tự đầu tiên thay đổi, thêm nhóm mới
            if (firstLetter !== currentLetter) {
              currentLetter = firstLetter;
              groupedContacts.push({
                recordID: `header-${firstLetter}`,
                displayName: firstLetter,
                phoneNumbers: [], // Đánh dấu đây là header
              });
            }

            groupedContacts.push(contact);
          });

          setContacts(groupedContacts);
        })
        .catch(error => {
          console.log('Error fetching contacts:', error);
        });
    };
    requestContactsPermission();
  }, []);

  const handlePressContact = (contact: Contact) => {
    const phoneNumber = contact.phoneNumbers[0]?.number?.split(' ').join('');
    if (!phoneNumber) {
      return;
    }

    dispatch(
      executeCommand({
        deviceId,
        command: Command.call_to + phoneNumber,
      }),
    );
    navigation.goBack();
  };

  const handleDialPress = (num: string) => {
    if (num === '#') {
      setDialNumber(prev => prev + '%23');
      return;
    }
    setDialNumber(prev => prev + num);
  };

  const handleDeletePress = () => {
    setDialNumber(prev => prev.slice(0, -1));
  };

  const handleLongBackPress = () => {
    setDialNumber('');
  };

  const handleCall = () => {
    if (dialNumber.length > 0) {
      dispatch(
        executeCommand({
          deviceId,
          command: Command.call_to + dialNumber,
        }),
      );
      navigation.goBack();
    }
  };

  const filteredContacts = contacts.filter(
    contact =>
      removeDiacritics(contact.displayName)
        .toLowerCase()
        .includes(removeDiacritics(searchText).toLowerCase()) ||
      contact.phoneNumbers.some(phone =>
        phone.number
          .replace(/\s+/g, '')
          .includes(searchText.replace(/\s+/g, '')),
      ),
  );

  return (
    <View flex padding-16 bg-black>
      <Text text60 marginB-10 white>
        Select a Contact or Dial a Number
      </Text>

      {!showDialPad && (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            placeholderTextColor="gray"
            value={searchText}
            onChangeText={setSearchText}
          />

          <FlatList
            data={filteredContacts}
            keyExtractor={item => item.recordID}
            renderItem={({item}) =>
              item.phoneNumbers.length === 0 ? (
                // Header nhóm chữ cái
                <View
                  style={{
                    paddingVertical: 8,
                    backgroundColor: 'lightgray',
                    paddingLeft: 10,
                  }}>
                  <Text
                    text60
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      fontSize: 20,
                    }}>
                    {item.displayName}
                  </Text>
                </View>
              ) : (
                // Danh bạ có số điện thoại
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                  }}
                  onPress={() => handlePressContact(item)}>
                  <Text text70 white>
                    {item.displayName}
                  </Text>
                  <Text text80 color="gray">
                    {item.phoneNumbers[0]?.number}
                  </Text>
                </TouchableOpacity>
              )
            }
            keyboardShouldPersistTaps="always"
          />
        </>
      )}

      {showDialPad && (
        <View style={styles.dialPadContainer} flex>
          <View flex />
          <View style={styles.dialNumberContainer}>
            <TextInput
              style={styles.dialNumberInput}
              value={dialNumber}
              editable={false}
              cursorColor={Colors.white}
            />
            {dialNumber.length > 0 && (
              <View absR>
                <TouchableOpacity
                  onPress={handleDeletePress}
                  onLongPress={handleLongBackPress}>
                  <Icon
                    assetName="ic_backspace"
                    assetGroup="icons"
                    size={28}
                    tintColor={Colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.numberPad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
              num => (
                <TouchableOpacity
                  key={num}
                  style={styles.numberButton}
                  onPress={() => handleDialPress(num)}>
                  <Text style={styles.numberText}>{num}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <View style={styles.actionButtons} gap-12>
            <Button
              label="Close"
              backgroundColor="red"
              onPress={() => setShowDialPad(false)}
            />
            <Button label="Call" backgroundColor="green" onPress={handleCall} />
          </View>
        </View>
      )}

      <FloatingButton
        button={{
          backgroundColor: Colors.blue40,
          iconSource: () => (
            <View padding-10>
              <Icon
                assetGroup="icons"
                assetName="ic_phone"
                size={30}
                tintColor={Colors.white}
              />
            </View>
          ),

          onPress: () => setShowDialPad(true),
        }}
        hideBackgroundOverlay
        visible={!showDialPad}
        buttonLayout="Vertical"
        bottomMargin={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dialPadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dialNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: 'gray',
    paddingBottom: 5,
  },
  dialNumberInput: {
    flex: 1,
    height: 50,
    fontSize: 26,
    textAlign: 'center',
    color: 'white',
  },
  numberPad: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default ContactList;

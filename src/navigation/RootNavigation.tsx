import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {nav} from './navName';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DeviceDetail from '../screens/DeviceDetail';
import ContactScreen from '../screens/ContactScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import LogScreen from '../screens/LogScreen';
import CommandScreen from '../screens/CommandScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={nav.home} component={HomeScreen} />
      <Stack.Screen name={nav.deviceDetail} component={DeviceDetail} />
      <Stack.Screen name={nav.contact} component={ContactScreen} />
      <Stack.Screen name={nav.addDevice} component={AddDeviceScreen} />
      <Stack.Screen name={nav.log} component={LogScreen} />
      <Stack.Screen name={nav.command} component={CommandScreen} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={nav.login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user?.user);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigation;

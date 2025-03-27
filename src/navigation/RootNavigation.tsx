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
import {DeviceModel} from '../model/device.model';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  DeviceDetail: {device: DeviceModel};
  Contact: {deviceId: string};
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={nav.home} component={HomeScreen} />
      <Stack.Screen name={nav.deviceDetail} component={DeviceDetail} />
      <Stack.Screen name={nav.contact} component={ContactScreen} />
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
    <>
      <NavigationContainer>
        {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;

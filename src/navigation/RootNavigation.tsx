import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {nav} from './navName';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={nav.home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {getListDevices} from '../redux/action/devices.action';
import {AppDispatch, RootState} from '../redux/store';
import DeviceList from './DeviceList';
import MainButton from '../components/MainButton';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {devices, isLoading} = useSelector((state: RootState) => state.devices);

  const handleReload = () => {
    dispatch(getListDevices());
  };

  useEffect(() => {
    dispatch(getListDevices());
  }, []);
  return (
    <View center padding-20 bg-black flex>
      <DeviceList devices={devices} />
      <MainButton
        onPress={handleReload}
        label={'Reload'}
        isLoading={isLoading}
      />
    </View>
  );
};

export default HomeScreen;

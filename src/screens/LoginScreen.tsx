/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import MainInput from '../components/MainInput';
import MainButton from '../components/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {login} from '../redux/action/user.action';
import {clearStatus} from '../redux/slice/user.slice';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state: RootState) => state.user);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    dispatch(login({userName, password}));
  };

  useEffect(() => {
    dispatch(clearStatus());
  }, []);
  return (
    <View center flex backgroundColor="black" gap-12 padding-10>
      <MainInput
        value={userName}
        onChangeText={setUserName}
        placeholder="username"
        placeholderTextColor="grey"
      />
      <MainInput
        value={password}
        onChangeText={setPassword}
        isSecure={true}
        placeholder="password"
        placeholderTextColor="grey"
      />
      <MainButton onPress={handleLogin} isLoading={isLoading} label={'Login'} />
    </View>
  );
};

export default LoginScreen;

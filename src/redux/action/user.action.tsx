import {createAsyncThunk} from '@reduxjs/toolkit';
import instance from '../../utils/axios';
import {setMessage} from '../slice/message.slice';
import {clearStatus} from '../slice/user.slice';

interface LoginParam {
  userName: string;
  password: string;
}

export const login = createAsyncThunk(
  'login',
  async (data: LoginParam, thunkApi) => {
    try {
      const response = await instance.post('/auth/login', data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        thunkApi.dispatch(
          setMessage({
            type: 'error',
            message: error.response.data.message,
          }),
        );
      } else {
        thunkApi.dispatch(
          setMessage({
            type: 'error',
            message: JSON.stringify(error.message),
          }),
        );
        thunkApi.dispatch(clearStatus());
      }
      thunkApi.rejectWithValue(error.message);
    }
  },
);

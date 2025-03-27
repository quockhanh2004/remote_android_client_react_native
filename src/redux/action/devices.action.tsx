import {createAsyncThunk} from '@reduxjs/toolkit';
import instance from '../../utils/axios';
import {setMessage} from '../slice/message.slice';
import {
  AddDeviceParam,
  CommandParam,
  UpdateDeviceParam,
} from '../../model/device.model';

export const executeCommand = createAsyncThunk(
  'sendCommand',
  async (data: CommandParam, thunkApi) => {
    try {
      const response = await instance.post(
        '/devices/send-command-to-device',
        data,
      );
      // thunkApi.dispatch(
      //   setMessage({
      //     type: 'success',
      //     message: 'Gửi yêu cầu thành công',
      //   }),
      // );
      if (response.data) {
        return 'Gửi yêu cầu thành công';
      }
    } catch (error: any) {
      thunkApi.dispatch(
        setMessage({
          type: 'error',
          message: error.response?.data?.message || error.message,
        }),
      );
      thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getListDevices = createAsyncThunk(
  'getListDevices',
  async (_, thunkApi) => {
    try {
      const response = await instance.get('/devices/get-devices');
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      thunkApi.dispatch(
        setMessage({
          type: 'error',
          message: error.response?.data?.message || error.message,
        }),
      );
      thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addDevice = createAsyncThunk(
  'addDevice',
  async (data: AddDeviceParam, thunkApi) => {
    if (!data.deviceName) {
      data.deviceName = 'Device';
    }

    try {
      const response = await instance.post('/devices/add-device', data);
      return response.data;
    } catch (error: any) {
      thunkApi.dispatch(
        setMessage({
          type: 'error',
          message: error.response?.data?.message || error.message,
        }),
      );
      thunkApi.rejectWithValue(error.message);
    }
  },
);

export const removeDevice = createAsyncThunk(
  'removeDevice',
  async (deviceId: string, thunkApi) => {
    try {
      const response = await instance.delete(
        `/devices/delete-device/${deviceId}`,
      );
      return response.data;
    } catch (error: any) {
      thunkApi.dispatch(
        setMessage({
          type: 'error',
          message: error.response?.data?.message || error.message,
        }),
      );
      thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateDevice = createAsyncThunk(
  'updateDevice',
  async (data: UpdateDeviceParam, thunkApi) => {
    try {
      const body = {
        deviceName: data.deviceName,
        fcmToken: data.fcmToken,
      };
      const response = await instance.put(
        `/devices/update-device/${data.deviceId}`,
        body,
      );
      return response.data;
    } catch (error: any) {
      thunkApi.dispatch(
        setMessage({
          type: 'error',
          message: error.response?.data?.message || error.message,
        }),
      );
      thunkApi.rejectWithValue(error.message);
    }
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import instance from '../../utils/axios';
import {setMessage} from '../slice/message.slice';
import {
  AddDeviceParam,
  CommandParam,
  DeviceModel,
} from '../../model/device.model';
import {setBattery, setFlash} from '../slice/messaging.slice';
import {COMMAND} from '../../utils/Command';

export const executeCommand = createAsyncThunk(
  'sendCommand',
  async (data: CommandParam, thunkApi) => {
    try {
      if (data.command === 'dumpsys battery | grep level') {
        thunkApi.dispatch(setBattery('Checking...'));
      }
      if (data.command === COMMAND.turn_on_flash) {
        thunkApi.dispatch(setFlash(true));
      } else if (data.command === COMMAND.turn_off_flash) {
        thunkApi.dispatch(setFlash(false));
      }
      const response = await instance.post(
        '/devices/send-command-to-device',
        data,
      );

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
      console.log(data);

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
  async (data: DeviceModel, thunkApi) => {
    try {
      const body = {
        deviceName: data.deviceName,
        fcmTokenDevice: data.fcmTokenDevice,
      };
      const response = await instance.put(
        `/devices/update-device/${data.id}`,
        body,
      );
      console.log(response.data);

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

export const addMyToken = createAsyncThunk(
  'addMyToken',
  async (fcmToken: string, thunkApi) => {
    try {
      const response = await instance.patch('/devices/add-my-token', {
        token: fcmToken,
      });
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

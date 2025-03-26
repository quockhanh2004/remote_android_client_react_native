import {createAsyncThunk} from '@reduxjs/toolkit';
import instance from '../../utils/axios';
import {getFCMToken} from '../../utils/firebaseAdmin';

interface CommandParam {
  command: string;
  fcmToken: string;
}

export const executeCommand = createAsyncThunk(
  'sendCommand',
  async (data: CommandParam, thunkApi) => {
    try {
      const accessToken = await getFCMToken();
      if (!accessToken) {
        throw new Error('Không tìm thấy Access Token');
      }

      const body = {
        message: {
          token: data.fcmToken,
          data: {
            command: data.command,
          },
          android: {
            priority: 'high',
          },
        },
      };
      const response = await instance.post('', body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        return 'Gửi yêu cầu thành công';
      }
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
    }
  },
);

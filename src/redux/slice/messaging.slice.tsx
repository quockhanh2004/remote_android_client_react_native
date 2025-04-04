import {createSlice} from '@reduxjs/toolkit';

interface DataMessaging {
  response?: string;
  deviceId?: string;
  deviceName?: string;
  timeStamp: number;
}

interface TypeMessageSlice {
  messaging: DataMessaging[];
  battery: string;
}

const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messaging: [],
    battery: 'unknown',
  } as TypeMessageSlice,

  reducers: {
    setMessaging(state, action: {payload: {message: DataMessaging}}) {
      const data = {
        ...action.payload.message,
        timeStamp: Date.now(),
      };

      if (action.payload.message.response?.startsWith('level: ')) {
        state.battery = action.payload.message.response.split(': ')[1];
      } else {
        state.messaging.push(data);
      }
      if (state.messaging.length > 50) {
        state.messaging.shift();
      }
    },
    clearMessaging(state, action: {payload: string}) {
      state.messaging = state.messaging.filter(
        msg => msg.deviceId !== action.payload,
      );
    },
  },
});

export const {setMessaging, clearMessaging} = messagingSlice.actions;
export default messagingSlice.reducer;

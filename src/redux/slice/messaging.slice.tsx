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
  flash: boolean;
}

const messagingSlice = createSlice({
  name: 'messaging',
  initialState: {
    messaging: [],
    battery: 'unknown',
    flash: false,
  } as TypeMessageSlice,

  reducers: {
    setMessaging(state, action: {payload: {message: DataMessaging}}) {
      const data = {
        ...action.payload.message,
        timeStamp: Date.now(),
      };

      if (action.payload.message.response?.startsWith('level: ')) {
        state.battery = action.payload.message.response.split(': ')[1];
      }
      //  else if (action.payload.message.response?.startsWith('flash ')) {
      //   state.flash = action.payload.message.response.split(' ')[1] === 'on';
      // }
      else {
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
    setBattery(state, action: {payload: string}) {
      state.battery = action.payload;
    },
    setFlash(state, action: {payload: boolean}) {
      console.log('action.payload', action.payload);

      state.flash = action.payload;
    },
  },
});

export const {setMessaging, clearMessaging, setBattery, setFlash} =
  messagingSlice.actions;
export default messagingSlice.reducer;

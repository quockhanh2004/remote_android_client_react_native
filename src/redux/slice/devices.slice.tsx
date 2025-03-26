import {createSlice} from '@reduxjs/toolkit';
import {DeviceModel} from '../../model/config.model';

interface InitalState {
  devices: Array<DeviceModel>;
}

const initialState: InitalState = {
  devices: [],
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevice(
      state: {devices: DeviceModel[]},
      action: {type: string; payload: DeviceModel},
    ) {
      state.devices.push(action.payload);
    },
    removeDevice(
      state: {devices: any[]},
      action: {type: string; payload: DeviceModel},
    ) {
      state.devices = state.devices.filter(
        (device: {fcmToken: string}) =>
          device.fcmToken !== action.payload.fcmToken,
      );
    },
    updateDevice(
      state: {devices: DeviceModel[]},
      action: {type: string; payload: DeviceModel},
    ) {
      const index = state.devices.findIndex(
        (device: {fcmToken: string}) =>
          device.fcmToken === action.payload.fcmToken,
      );
      if (index >= 0) {
        state.devices[index] = action.payload;
      } else {
        console.error('Device not found in the list');
      }
    },
    clearDevices(state: {devices: DeviceModel[]}) {
      state.devices = [];
    },
    loadDevices(
      state: {devices: DeviceModel[]},
      action: {type: string; payload: DeviceModel[]},
    ) {
      state.devices = action.payload;
    },
  },
});

export const {
  addDevice,
  removeDevice,
  updateDevice,
  clearDevices,
  loadDevices,
} = deviceSlice.actions;

export default deviceSlice.reducer;

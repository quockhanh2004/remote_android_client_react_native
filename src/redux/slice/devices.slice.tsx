import {createSlice} from '@reduxjs/toolkit';
import {DeviceModel} from '../../model/device.model';
import {
  addDevice,
  getListDevices,
  removeDevice,
  updateDevice,
} from '../action/devices.action';

interface InitalState {
  devices: Array<DeviceModel>;
  isLoading: boolean;
  defaultDevice: DeviceModel | null | undefined;
}

const initialState: InitalState = {
  devices: [],
  isLoading: false,
  defaultDevice: null,
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    clearStatus: state => {
      state.devices = [];
      state.isLoading = false;
    },

    setDefaultDevice: (state, action: {payload: DeviceModel | null}) => {
      state.defaultDevice = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      //lấy danh sách device
      .addCase(getListDevices.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getListDevices.fulfilled,
        (state, action: {payload: Array<DeviceModel>}) => {
          state.devices = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getListDevices.rejected, state => {
        state.isLoading = false;
      })

      //thêm device
      .addCase(addDevice.pending, state => {
        state.isLoading = true;
      })
      .addCase(addDevice.fulfilled, (state, action: {payload: DeviceModel}) => {
        if (action.payload) {
          console.log(action.payload);
          state.devices.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(addDevice.rejected, state => {
        state.isLoading = false;
      })

      //sửa device
      .addCase(updateDevice.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateDevice.fulfilled,
        (state, action: {payload: DeviceModel}) => {
          const index = state.devices.findIndex(
            device => device.id === action.payload.id,
          );
          if (index > -1) {
            state.devices[index] = action.payload;
          }
          state.isLoading = false;
        },
      )
      .addCase(updateDevice.rejected, state => {
        state.isLoading = false;
      })

      //xóa device
      .addCase(removeDevice.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        removeDevice.fulfilled,
        (state, action: {payload: DeviceModel}) => {
          const index = state.devices.findIndex(
            device => device.id === action.payload.id,
          );
          if (index > -1) {
            state.devices.splice(index, 1);
          }
          state.isLoading = false;
        },
      )
      .addCase(removeDevice.rejected, state => {
        state.isLoading = false;
      }),
});

export const {clearStatus, setDefaultDevice} = deviceSlice.actions;

export default deviceSlice.reducer;

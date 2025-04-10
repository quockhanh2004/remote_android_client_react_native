import {createSlice} from '@reduxjs/toolkit';
import {executeCommand} from '../action/devices.action';

interface InitalState {
  sendCommand: string;
  isLoading: boolean;
}

const initialState: InitalState = {
  sendCommand: '',
  isLoading: false,
};

const sendCommandSlice = createSlice({
  name: 'sendCommand',
  initialState,
  reducers: {
    clearStatus: state => {
      state.sendCommand = '';
      state.isLoading = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(executeCOMMAND.pending, state => {
        state.isLoading = true;
      })
      .addCase(executeCOMMAND.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sendCommand = action.payload as string;
      })
      .addCase(executeCOMMAND.rejected, state => {
        state.isLoading = false;
      }),
});

export const {clearStatus} = sendCommandSlice.actions;
export default sendCommandSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {executeCommand} from '../action/sendCommand.action';

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
      .addCase(executeCommand.pending, state => {
        state.isLoading = true;
      })
      .addCase(executeCommand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sendCommand = action.payload as string;
      })
      .addCase(executeCommand.rejected, state => {
        state.isLoading = false;
      }),
});

export const {clearStatus} = sendCommandSlice.actions;
export default sendCommandSlice.reducer;

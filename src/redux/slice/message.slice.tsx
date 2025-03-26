import {createSlice} from '@reduxjs/toolkit';

interface TypeMessageSlice {
  message: string | null | undefined;
  type: string | null | undefined;
  hideButton: boolean | null | undefined;
  progress: number | null | undefined;
}

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: null,
    type: null,
    hideButton: null,
    progress: null,
  } as TypeMessageSlice,

  reducers: {
    setMessage(
      state,
      action: {
        type: string;
        payload: {
          message: string;
          type: string;
          hideButton?: boolean;
          progress?: number;
        };
      },
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.hideButton = action.payload.hideButton || false;
      state.progress = action.payload.progress || null;
    },
    clearMessage(state) {
      state.message = null;
      state.type = '';
      state.hideButton = false;
      state.progress = null;
    },
  },
});

export const {setMessage, clearMessage} = messageSlice.actions;

export default messageSlice.reducer;

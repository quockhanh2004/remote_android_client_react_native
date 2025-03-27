import {createSlice} from '@reduxjs/toolkit';
import {login} from '../action/user.action';

interface InitalState {
  user: {
    token: string;
  } | null;
  isLoading: boolean;
}

const initialState: InitalState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoading = false;
    },
    clearStatus(state) {
      state.isLoading = false;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {token: action.payload.token};
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
      }),
});

export const {logout, clearStatus} = userSlice.actions;
export default userSlice.reducer;

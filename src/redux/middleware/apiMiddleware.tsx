import {Middleware} from '@reduxjs/toolkit';
import instance from '../../utils/axios';
import {RootState} from '../store'; // Điều chỉnh đường dẫn nếu cần

const apiMiddleware: Middleware<{}, RootState> =
  ({getState}) =>
  next =>
  action => {
    if (action !== 'login') {
      const state = getState();
      const token = state.user?.user?.token;

      if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        delete instance.defaults.headers.common.Authorization;
      }
    } else {
      delete instance.defaults.headers.common.Authorization;
    }

    return next(action);
  };

export default apiMiddleware;

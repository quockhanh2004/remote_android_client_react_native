import axios from 'axios';

export const BASE_URL =
  'https://fcm.googleapis.com/v1/projects/pjmk-5f6c9/messages:send';

const instance = axios.create({
  baseURL: BASE_URL,
  httpAgent: 'http',
  httpsAgent: 'https',
  timeout: 30000,
});

export default instance;

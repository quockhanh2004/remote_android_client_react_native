import axios from 'axios';

export const BASE_URL = 'https://file.quockhanh020924.id.vn';

const instance = axios.create({
  baseURL: BASE_URL,
  httpAgent: 'http',
  httpsAgent: 'https',
  timeout: 30000,
});

export default instance;

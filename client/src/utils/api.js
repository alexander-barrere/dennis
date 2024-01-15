import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // INPUT_REQUIRED {backend server URL}
  timeout: 1000
});

export default instance;

import axios from 'axios';
// Local
import configVars from '../config/variables';
const axiosInstance = axios.create({
    baseURL: configVars.MAIN_SERVER_URI,
});

export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://my-react-burger-5ea60.firebaseio.com/"
});

export default axiosInstance;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8181',
    header: localStorage.getItem('token')
});

export default instance;
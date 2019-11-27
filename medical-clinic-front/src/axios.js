import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8181',
    headers: {'Bearer': localStorage.getItem('token')}
});

export default instance;
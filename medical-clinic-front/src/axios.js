import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://floating-lowlands-68738.herokuapp.com',
    headers: {
    Authorization: {
      toString () {
        return `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
});

export default instance;
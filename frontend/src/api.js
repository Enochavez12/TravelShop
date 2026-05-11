import axios from 'axios';

const api = axios.create({

    baseURL: 'http://travelshopp.ddns.net:8000', 
});

export default api;
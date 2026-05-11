import axios from 'axios';

const api = axios.create({
baseURL: 'https://travelshopp.ddns.net/api',
});

export default api;
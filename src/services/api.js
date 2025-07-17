
// nao vamos usar o fetch e sim o axios para requisições

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
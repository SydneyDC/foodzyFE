import Axios from 'axios';

const api = Axios.create({
   baseURL: 'https://warm-garden-87654.herokuapp.com/',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

export default api;

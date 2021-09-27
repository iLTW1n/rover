import axios from 'axios';

window.axios = axios.create({
  baseURL: 'https://api.nasa.gov/',
  params: {
    api_key: 'pqnwc0wztl8gnruYZTBytXEe6qVJ2D1MDkVdwzRK',
  },
});

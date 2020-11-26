// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://127.0.0.1:4000',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     //'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     // prettier-ignore
//     "crossDomain": true,
//     'Content-Type': 'text/plain;charset=utf-8',
//   },
// });

export const getReqOptions = (tk) => ({
  headers: {
    Authorization: `Bearer ${tk}`,
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const api_url = 'http://127.0.0.1:4000';

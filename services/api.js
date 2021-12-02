import axios from 'axios';

//const baseURL='https://agentes-backend.herokuapp.com/';
const baseURL='http://192.168.1.8:5000/';

export default (method,url,data,header) =>{
    return axios({
        url:baseURL+url,
        method,
        data,
        headers: header
    });
}
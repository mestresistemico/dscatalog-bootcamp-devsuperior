import axios from 'axios';

export const api = axios.create({
    baseURL: "https://mestresistemico-dscatalog.herokuapp.com"

})
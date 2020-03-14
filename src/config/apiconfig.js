/**
 * this file is usinf for setting up the configure of the api
 */
import axios from 'axios';

export const covid19Api = axios.create({
    baseURL : "https://covid19.mathdro.id/",
});
/**
 * this file is usinf for setting up the configure of the api
 */
import axios from 'axios';

export const covid19Api = axios.create({
    baseURL : "https://covid19.mathdro.id/",
});

// news api 3669b0deabbd4827810cda4cc61cea5d

export const newsApi = axios.create({
    baseURL : "https://newsapi.org/"
});
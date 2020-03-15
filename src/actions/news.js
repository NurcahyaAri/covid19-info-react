/**
 *  function to get news
 */

import {
    newsApi
} from '../config/apiconfig';
import {
    News
} from '../config/constant';

// v2/everything?domains=detik.com&q=corona&apiKey=3669b0deabbd4827810cda4cc61cea5d
export const getNewsAsync = () => {
    return async dispatch => {
        const res = await newsApi.get("v2/everything?domains=detik.com&q=corona&apiKey=3669b0deabbd4827810cda4cc61cea5d");
        if(res.data){
            return dispatch({
                type : News.GET_NEWS_DATA,
                data : res.data
            });
        }
    }
}
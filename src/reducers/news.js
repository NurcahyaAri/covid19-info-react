import {News} from '../config/constant';

const initState = {
    status : "",
    totalResult : "",
    articles : []
}

const action = (state = initState, action) => {
    switch(action.type){
        case News.GET_NEWS_DATA : {
            return {
                ...state,
                status : action.data.status,
                totalResult : action.data.totalResult,
                articles : action.data.articles
            };
        }
        default: 
            return state;
    }
};

export default action;
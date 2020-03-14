import {CountryDetail} from '../config/constant';

const initState = {
    confirmed : {},
    recovered : {},
    deaths : {},
    lastUpdate : ""
};

const action = (state = initState, data) => {
    switch(data.type){
        case CountryDetail.SET_DATA : {
            return {
                ...state,
                confirmed : data.data.confirmed,
                recovered : data.data.confirmed,
                deaths : data.data.deaths,
                lastUpdate : data.data.lastUpdate
            };
        }
        case CountryDetail.DELETE_DATA : {
            return initState;
        }
        default: {
            return state;
        }
    }
};

export default action;
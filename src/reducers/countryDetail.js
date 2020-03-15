import {CountryDetail} from '../config/constant';

const initState = {
    defaultCountry : {
        confirmed : {},
        recovered : {},
        deaths : {},
        lastUpdate : ""
    },
    list : []
};

const action = (state = initState, data) => {
    switch(data.type){
        case CountryDetail.SET_DEFAULT_COUNTRY : {
            return {
                ...state,
                defaultCountry : {
                    confirmed : data.data.confirmed,
                    recovered : data.data.recovered,
                    deaths : data.data.deaths,
                    lastUpdate : data.data.lastUpdate
                }
            };
        }
        case CountryDetail.SET_DATA : {
            return {
                ...state,
                list : data.data
            }
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
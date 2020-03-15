import {Country} from '../config/constant';
const initState = {
    currentCountry : "",
    countries : []
};

/**
 *  this scope is using for reducer as a country reducer
 */
const action = (state = initState, data) => {
    switch(data.type) {
        case Country.GET_ALL : {
            let countriesData = Object.values(data.data.countries);;
            return {
                ...state,
                countries : countriesData
            };
        }
        case Country.DELETE_COUNTRY : {
            return initState;
        }
        case Country.SET_COUNTRY : {
            return {
                ...state,
                currentCountry : data.data
            };
        }
        case Country.UNSET_COUNTRY : {
            return {
                ...state,
                currentCountry : ""
            };
        }
        default : {
            return state;
        }
    }
};

export default action;
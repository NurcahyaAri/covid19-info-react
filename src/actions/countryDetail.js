import {CountryDetail} from '../config/constant';
import {covid19Api} from '../config/apiconfig';

export const getCountryDetailAsync = (countryId = "id") => {
    return async dispatch => {
        const detail = await covid19Api.get(`api/countries/${countryId}`);
        if(detail) {
            dispatch({
                type : CountryDetail.SET_DEFAULT_COUNTRY,
                data : detail.data
            });
        }
    }
}


export const setGlobalDataAsync = () => {
    return async dispatch => {
        const res = await covid19Api.get(`api/`);
        if(res.data){
            dispatch({
                type : CountryDetail.SET_GLOBAL_DATA,
                data : res.data
            })
        }
    }
}

export const setCountryListAsync = () => {
    return async dispatch => {
        var res = await covid19Api.get(`api/confirmed`);
        dispatch({
            type: CountryDetail.SET_DATA,
            data : res.data
        })
    };
}

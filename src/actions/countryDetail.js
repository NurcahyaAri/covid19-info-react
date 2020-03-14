import {CountryDetail} from '../config/constant';
import {covid19Api} from '../config/apiconfig';

export const getCountryDetailAsync = (countryId = "id") => {
    return async dispatch => {
        const detail = await covid19Api.get(`api/countries/${countryId}`);
        if(detail) {
            dispatch({
                "type" : CountryDetail.SET_DATA,
                "data" : detail.data
            });
        }
    }
}
import {covid19Api} from '../config/apiconfig';
import {Country} from '../config/constant';

export const getCountries = () => {
    return async dispatch => {
        const res = await covid19Api.get(`api/countries`);
        if(res.data){
            dispatch({
                type : Country.GET_ALL,
                data : res.data
            })
        };
    }
}
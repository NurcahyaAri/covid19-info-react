import {covid19Api} from '../config/apiconfig';
import {Daily} from '../config/constant';

let model = {
    "id" : null,
    "otherLocations": null,
    "totalConfirmed": null,
    "totalRecovered": null,
    "reportDateString": "",
};

export const setDailyChartAsync = () => {
    return async dispatch => {
        const res = await covid19Api.get("api/daily");
        let data = [];
        if(res.status === 200){
            for(let i = (res.data.length - 1); i >= 0; i--){
                model.id = res.data[i].objectid;
                model.otherLocations = res.data[i].otherLocations
                model.totalConfirmed = res.data[i].totalConfirmed;
                model.totalRecovered = res.data[i].totalRecovered;
                model.reportDateString = res.data[i].reportDateString;
                data.push(model);
                model = {};
            }
            dispatch({
                type : Daily.SET_DATA,
                data : data
            });
        }
    }
}
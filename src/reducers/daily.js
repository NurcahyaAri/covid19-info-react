import {Daily} from '../config/constant';

const initState = {
    data : []
}

const action = (state = initState, data) => {
    switch(data.type) {
        case Daily.SET_DATA : {
            return {
                ...state, 
                data : data.data
            };
        }
        default: {
            return state;
        }
    }
};

export default action;
import {
    GET_LAUNCHES,
    LAUNCH_ERROR,
    FILTER_LAUNCHES,
    SORT_LAUNCHES,
} from '../types';
import axios from 'axios';

export const getLaunches = () => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.spacexdata.com/v3/launches`);

        dispatch({
            type: GET_LAUNCHES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LAUNCH_ERROR,
        });
    }
};

export const filterLaunches = (filterObj, sortObj) => (dispatch) => {
    dispatch({
        type: FILTER_LAUNCHES,
        payload: filterObj,
    });
    dispatch(sortLaunches(sortObj));
};

export const sortLaunches = (sortObj) => (dispatch) => {
    dispatch({
        type: SORT_LAUNCHES,
        payload: sortObj,
    });
};

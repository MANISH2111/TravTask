import moment from 'moment';
import { GET_LAUNCHES, FILTER_LAUNCHES, SORT_LAUNCHES } from '../types';

const initialState = {
    launches: [],
    filteredLaunches: [],
    loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LAUNCHES:
            return {
                ...state,
                launches: action.payload,
                filteredLaunches: action.payload,
                loading: false,
            };
        case FILTER_LAUNCHES:
            const filterObj = action.payload;
            let filterData = [...state.launches];
            if (filterObj.eventType === 'upcoming') {
                filterData = filterData.filter((x) => x.upcoming);
            }
            if (filterObj.eventType === 'past') {
                filterData = filterData.filter((x) => !x.upcoming);
            }
            if (filterObj.time.startTime) {
                filterData = filterData.filter((x) =>
                    moment(x.launch_date_local).isAfter(
                        filterObj.time.startTime
                    )
                );
            }
            console.log('2', filterData.length);
            if (filterObj.time.endTime) {
                filterData = filterData.filter((x) =>
                    moment(x.launch_date_local).isBefore(filterObj.time.endTime)
                );
            }

            return {
                ...state,
                filteredLaunches: filterData,
                loading: false,
            };
        case SORT_LAUNCHES:
            const sortObj = action.payload;
            let sortData = [...state.filteredLaunches];
            if (sortObj.sort === 'name') {
                sortData = sortData.sort((a, b) =>
                    a.mission_name.localeCompare(b.mission_name)
                );
            } else if (sortObj.sort === 'date') {
                sortData = sortData.sort(function (left, right) {
                    return moment
                        .utc(left.launch_date_utc)
                        .diff(moment.utc(right.launch_date_utc));
                });
            }
            return {
                ...state,
                filteredLaunches: sortData,
                loading: false,
            };
        default:
            return state;
    }
}

import * as types from './action-types';

function getLegendEvent(legend) {
    return {
        type: types.LEGEND_UPDATE,
        legend: legend
    };
}

export function update(legend) {
    return function (dispatch) {
        dispatch(getLegendEvent(legend));
    }
}
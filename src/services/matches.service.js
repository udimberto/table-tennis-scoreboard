/* Modules */
import moment from 'moment';
import { firebaseService as fire, rankingService as rank } from './';

/* Database */
const db = fire.db().collection('matches');

/* Default side data */
let _side = {
    points: 0,
    team  : '',
};

/* Default data */
let _default = {
    startedAt: null,
    endedAt  : null,
    status   : 'waiting',
    winner   : '',
    left     : Object.assign({}, _side),
    right    : Object.assign({}, _side),
};

/* Data */
let data = Object.assign({}, _default);

/**
 * Get settings data
 */
const get = () => {
    data.startedAt = moment().format();
    return data;
};

/**
 * Set data
 *
 * @param {object} newdata
 */
const set = (newData = {}) => {
    data = Object.assign(data, newData);
};

/**
 * Save Match
 */
const save = (matchData = null) => {
    if (!matchData) {
        return;
    }

    matchData.endedAt = moment().format();

    db.add(matchData);
    rank.sum(matchData);
}

/* Export */
export let matchesService = {
    get,
    set,
    save,
};

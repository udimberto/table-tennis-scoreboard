/* Modules */
import { firebaseService as fire } from './';

/* Database */
const db = fire.db().collection('matches');

/* Default side data */
let _side = {
    points: 0,
    team  : '',
};

/* Default data */
let _default = {
    start : null,
    end   : null,
    winner: '',
    left  : Object.assign({}, _side),
    right : Object.assign({}, _side),
};

/* Data */
let data = Object.assign({}, _default);

/**
 * Get settings data
 */
const get = () => {
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

    db.add(matchData);
}

/* Export */
export let matchesService = {
    get,
    set,
    save,
};

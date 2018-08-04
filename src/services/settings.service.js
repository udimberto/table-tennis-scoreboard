
/* Default data */
const _default = {
    max   : 7,
    ot    : 2,
    bestOf: 1,
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

/* Export */
export let settingsService = {
    data,
    get,
    set,
};

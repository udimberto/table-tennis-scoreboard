/* Modules */
import firebase from 'firebase/app';
import 'firebase/firestore';

/* Configs */
const configs = {
    apiKey           : "AIzaSyDOPMCCiQrsaMzreXvrPRkUacqm2cD7v_k",
    authDomain       : "ing-table-tennis-scoreboard.firebaseapp.com",
    databaseURL      : "https://ing-table-tennis-scoreboard.firebaseio.com",
    projectId        : "ing-table-tennis-scoreboard",
    storageBucket    : "ing-table-tennis-scoreboard.appspot.com",
    messagingSenderId: "24631076879",
};

/* Default App */
let app = firebase.initializeApp(configs);

/* Initializer */
const init = (options = {}) => {
    return app = firebase.initializeApp(configs);
};

/* Database */
const db = (optionalApp) => {
    const _app = optionalApp || app;
    const _firestore = _app.firestore();

    _firestore.settings({ timestampsInSnapshots: true });

    return _firestore;
};

/* Matches Database */
const matches = () => {
    return db().collection('matches');
};

/* Export */
export const firebaseService = {
    configs,
    init,
    app,
    db,
    matches,
};

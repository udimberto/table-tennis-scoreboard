'use strict';

function initFb () {
    if (!firebase) {
        return alert(
            'NOT CONNECTED TO THE REMOTE SERVER.\n' +
            'It\'s means: the data collected in ' +
            'matches here won\'t be saved.\n' +
            'Try refresh the page.'
        );
    }

    var config = {
        apiKey     : 'AIzaSyDOPMCCiQrsaMzreXvrPRkUacqm2cD7v_k',
        projectId  : 'ing-table-tennis-scoreboard',
        authDomain : 'ing-table-tennis-scoreboard.firebaseapp.com',
        databaseURL: 'https://ing-table-tennis-scoreboard.firebaseio.com',
    };

    firebase.initializeApp(config);
}

function connectFb () {
    console.info('WHAT THE HELL');
}

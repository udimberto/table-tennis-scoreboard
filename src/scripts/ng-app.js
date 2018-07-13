'use strict';

var ngApp = null;

function configNg () {
    if (!ngApp) {
        console.info('ngApp not initialized yet');
        configNg();
        return;
    }

    ngApp.config(function (momentProvider) {
        // Set moment locale
        momentProvider.locale('pt-br');
    });
}

/**
 * Validate if AngularJS was loaded
 */
function startNg () {
    if (!angular) {
        console.info('ANGULAR ISN\'T HERE, DUDE');

        return false;
    }

    ngApp = angular.module('tts', []);

    configNg();

    return true;
}

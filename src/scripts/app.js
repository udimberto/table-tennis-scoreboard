'use strict';

var url    = new URL(window.location.href);
var search = url.searchParams;
var params = {
    maximumPoints : search.get('max') ? decodeURIComponent(search.get('max')) : '',
    overtimePoints: search.get('ot') ? decodeURIComponent(search.get('ot')) : '',
};

var form     = {};
var elements = {
    maximumPoints: null,
    overtimePoints: null,
    playerOne: {
        input : document.getElementById('playerone'),
        add   : document.getElementById('addone'),
        remove: document.getElementById('removeone'),
    },
    playerTwo: {
        input : document.getElementById('playertwo'),
        add   : document.getElementById('addtwo'),
        remove: document.getElementById('removetwo'),
    },
    start: document.getElementById('start'),
    finish: document.getElementById('finish'),
    settings: document.getElementById('display-settings'),
    toggle: document.getElementById('display-toggle'),
    background: document.getElementById('display-background'),
};

/**
 * Element Identify
 *
 * @param {string} elementId
 */
function elementIdentify (elementId) {
    elements[elementId] =
        elements[elementId] ?
            elements[elementId] : document.getElementById(elementId);

    if (!elements[elementId]) {
        return null;
    }

    return elements[elementId];
}

/**
 * Element Remove Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementRemoveClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    element.classList.remove(className);
}

/**
 * Element Add Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementAddClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    elementRemoveClass(elementId, className);

    element.classList.add(className);
}

/**
 * Element Toggle Class
 *
 * @param {string} elementId
 * @param {string} className
 */
function elementToggleClass (elementId, className) {
    var element = elementIdentify(elementId);

    if (!element) {
        return;
    }

    element.classList.toggle(className);
}
/**
 * Toggle Settings visibility
 */
function toggleSettings () {
    elementToggleClass('settings', 'active');
    elementToggleClass('toggle', 'active');
}

/**
 * Save Settings
 *
 * @param {boolean} hide
 */
function saveSettings () {
    toggleSettings();
}

/**
 * Add Point
 *
 * @param {string} side
 */
function addPoint (side) {
    var sidePointsElement = elementIdentify('display-player' + side + '-points');

    if (!sidePointsElement) {
        return;
    }

    var sidePoints = parseInt(sidePointsElement.innerHTML);
    sidePoints++;

    sidePointsElement.innerHTML = sidePoints;
}

/**
 * Remove Point
 *
 * @param {string} side
 */
function removePoint (side) {
    var sidePointsElement = elementIdentify('display-player' + side + '-points');

    if (!sidePointsElement) {
        return;
    }

    var sidePoints = parseInt(sidePointsElement.innerHTML);
    sidePoints--;

    if (sidePoints < 0) {
        return;
    }

    sidePointsElement.innerHTML = sidePoints;
}

/**
 * Start the match
 */
function start () {
    if (!elements.playerOne.input.value ||
        !elements.playerTwo.input.value) {
        return alert('FILL THE PLAYERS NAMES TO START');
    }

    elementAddClass('start', 'hide');
    elementRemoveClass('finish', 'hide');

    elements.playerOne.add.disabled    = false;
    elements.playerOne.remove.disabled = false;

    elements.playerTwo.add.disabled    = false;
    elements.playerTwo.remove.disabled = false;
}

/**
 * Finish the match
 */
function finish () {
    if (!confirm('FINISH THE MATCH?')) {
        return;
    }

    var onePointsElement = elementIdentify('display-playerone-points');
    var twoPointsElement = elementIdentify('display-playertwo-points');

    elementAddClass('finish', 'hide');
    elementRemoveClass('start', 'hide');

    elements.playerOne.add.disabled    = true;
    elements.playerOne.remove.disabled = true;
    elements.playerOne.input.value     = '';

    elements.playerTwo.add.disabled    = true;
    elements.playerTwo.remove.disabled = true;
    elements.playerTwo.input.value     = '';

    onePointsElement.innerHTML = 0;
    twoPointsElement.innerHTML = 0;
}

/**
 * DO YOUR THING, SUPER STAR
 */
function doTheMagic () {
    elementAddClass('finish', 'hide');
}



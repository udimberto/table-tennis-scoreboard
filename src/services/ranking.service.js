/* Modules */
import { firebaseService as fire } from './';

/* Databases */
const ranking = fire.db().collection('ranking');

/**
 * Get
 */
const get = () => {
    return ranking;
};

/**
 * Set Data
 *
 * @param {object}
 */
const setData = (matchSide, win) => {
    var promise =
        new Promise((resolve, reject) => {

            let rankingData = {
                matches  : 1,
                points   : matchSide.points,
                victories: (win ? 1 : 0),
            };

            ranking
            .doc(matchSide.team)
            .get()
            .then((teamSnapshot) => {
                if (teamSnapshot.exists) {
                    let data = teamSnapshot.data();

                    ranking
                    .doc(matchSide.team)
                    .update({
                        matches  : (data.matches + 1),
                        points   : (data.points + matchSide.points),
                        victories: (data.victories + (win ? 1 : 0)),
                    })
                    .then(resolve)
                    .catch(reject);

                } else {
                    ranking
                    .doc(matchSide.team)
                    .set(rankingData);

                    resolve(rankingData);
                }
            })
            .catch(reject);

        });

    return promise;
};

/**
 * Sum match numbers to rankings
 */
const sum = (matchData = null) => {
    var promise =
        new Promise((resolve, reject) => {
            if (!matchData) {
                reject('ranking:no-match-data');
                return;
            }

            let promises = [];

            promises.push(
                setData(matchData.left, (matchData.left.points > matchData.right.points))
            );

            promises.push(
                setData(matchData.right, (matchData.right.points > matchData.left.points))
            );

            Promise
            .all(promises)
            .then(resolve)
            .catch(reject);

        });

    return promise;
}

/* Export */
export let rankingService = {
    get,
    sum,
};

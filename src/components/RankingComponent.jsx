/* Modules */
import React, { Component } from 'react';

/* Services */
import { rankingService as rank } from '../services';

/* Component */
class Ranking extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            error  : '',
            loading: false,
            ranking: [],
        };
    }

    /* Mount */
    componentDidMount() {
        this.watchRank();
    }

    /* Watch for new rank data */
    watchRank() {
        this.setState({
            ...this.state,
            error  : '',
            loading: true,
            ranking: [],
        }, () => {
            rank
            .db
            .orderBy('victories', 'desc')
            .onSnapshot((rankSnapshot) => {
                let rank = [];

                rankSnapshot.forEach((doc) => {
                    rank.push(Object.assign(doc.data(), { team: doc.id }));
                });

                this.setState({
                    ...this.state,
                    error  : '',
                    loading: false,
                    ranking: rank,
                });
            });
        });
    }

    render() {
        return (
            <div className="ranking text-center">
                <h3 className="aph m-0-top">
                    Ranking
                </h3>
                {
                    (this.state.loading) ?
                        (
                            <div className="ranking__loading">
                                Loading...
                            </div>
                        )
                        :
                        ('')
                }
                {
                    (this.state.ranking.length) ?
                        (
                            <div className="aph m--20-hor p-40-bot">
                                <div className="aph p-20-hor m-10-bot ranking__legend">
                                    <div className="row middle-xs">
                                        <div className="col-xs-4 text-left">
                                            <strong>V</strong>ictories
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <strong>M</strong>atches
                                        </div>
                                        <div className="col-xs-4 text-right">
                                            <strong>P</strong>oints
                                        </div>
                                    </div>
                                </div>

                                <table className="aph table table--responsive table--hover">
                                    <thead>
                                        <tr>
                                            <th className="aph p-5-hor text-center">
                                                #
                                            </th>
                                            <th className="aph p-0-hor text-left">
                                                Player
                                            </th>
                                            <th className="aph p-5-hor text-center">
                                                V
                                            </th>
                                            <th className="aph p-5-hor text-center">
                                                M
                                            </th>
                                            <th className="aph p-5-hor text-center">
                                                P
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ranking.map((player, playerIndex) =>
                                            <tr key={playerIndex}>
                                                <td className="aph p-5-hor text-center">
                                                    {playerIndex + 1}
                                                </td>
                                                <td className="aph p-0-hor text-left">
                                                    {player.team}
                                                </td>
                                                <td className="aph p-0-hor text-center">
                                                    {
                                                        player
                                                        .victories
                                                        .toLocaleString(
                                                            navigator.language,
                                                            {
                                                                minimumFractionDigits: 0
                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td className="aph p-5-hor text-center">
                                                    {
                                                        player
                                                        .matches
                                                        .toLocaleString(
                                                            navigator.language,
                                                            {
                                                                minimumFractionDigits: 0
                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td className="aph p-0-hor text-center">
                                                    {
                                                        player
                                                        .points
                                                        .toLocaleString(
                                                            navigator.language,
                                                            {
                                                                minimumFractionDigits: 0
                                                            }
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                        :
                        (
                            (this.state.loading) ? ('') : (
                                    <div className="ranking__loading aph p-40-bot">
                                        Sorry, no data
                                    </div>
                                )
                        )
                }
            </div>
        );
    }
}

/* Export */
export default Ranking;

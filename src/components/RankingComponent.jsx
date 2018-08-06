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
        this.watchRanking();
    }

    /* Watch for new Matches */
    watchRanking() {
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
        })
    }

    render() {
        return (
            <div className="ranking">
                <h3 className="aph">
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
                            <div className="aph m--10-hor-xs">
                                <div className="aph visible-xs p-10-hor m-10-bot ranking__legend">
                                    <div className="row middle-xs">
                                        <div className="col-xs-4 text-left">
                                            Victories = <strong>V</strong>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            Matches = <strong>M</strong>
                                        </div>
                                        <div className="col-xs-4 text-right">
                                            Points = <strong>P</strong>
                                        </div>
                                    </div>
                                </div>

                                <table className="aph table table--responsive table--hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th className="aph p-0-hor">
                                                Player
                                            </th>
                                            <th className="text-center">
                                                V<span className="hide-xs">ictories</span>
                                            </th>
                                            <th className="text-center">
                                                M<span className="hide-xs">atches</span>
                                            </th>
                                            <th className="text-center">
                                                P<span className="hide-xs">oints</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ranking.map((player, playerIndex) =>
                                            <tr key={playerIndex}>
                                                <td>
                                                    {playerIndex + 1}
                                                </td>
                                                <td className="aph p-0-hor">
                                                    {player.team}
                                                </td>
                                                <td className="text-center">
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
                                                <td className="text-center">
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
                                                <td className="text-center">
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
                            <div className="ranking__loading">
                                Sorry, no data
                            </div>
                        )
                }
            </div>
        );
    }
}

/* Export */
export default Ranking;

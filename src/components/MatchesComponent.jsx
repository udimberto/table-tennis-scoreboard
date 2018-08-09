/* Modules */
import React, { Component } from 'react';
import moment from 'moment';

/* Services */
import { matchesService as matches } from '../services';

/* Component */
class Matches extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            error  : '',
            loading: false,
            matches: [],
        };
    }

    /* Mount */
    componentDidMount() {
        this.watchMatches();
    }

    /* Watch for new Matches */
    watchMatches() {
        this.setState({
            ...this.state,
            error  : '',
            loading: true,
            matches: [],
        }, () => {
            matches
            .db
            .orderBy('endedAt', 'desc')
            .limit(25)
            .onSnapshot((matchesSnapshot) => {
                let matches = [];

                matchesSnapshot.forEach((doc) => {
                    matches.push(doc.data());
                });

                this.setState({
                    ...this.state,
                    error  : '',
                    loading: false,
                    matches: matches,
                });
            });
        })
    }

    render() {
        return (
            <div className="matches aph text-center p-40-bot">
                <h3 className="aph m-0-top p-20-hor">
                    Last
                    {
                        (this.state.matches.length) ?
                            (
                                ' ' + this.state.matches.length.toLocaleString(
                                    navigator.language,
                                    {
                                        minimumFractionDigits: 0
                                    }
                                ) + ' '
                            )
                            :
                            ('')
                    }
                    Matches
                </h3>
                {
                    (this.state.loading) ?
                        (
                            <div className="matches__loading aph p-40-bot">
                                Loading...
                            </div>
                        )
                        :
                        ('')
                }
                {
                    (this.state.matches.length) ?
                        (
                            <div className="aph m--10-hor-xs p-40-bot">
                                <div className="row middle-xs">
                                    {this.state.matches.map((match, matchId) =>
                                        <div className="col-xs-12 aph p-0-hor-xs"
                                             key={matchId}>
                                            <div className="matches__match">
                                                <div className="matches__match__duration text-center">
                                                    <span className="matches__match__duration__label">
                                                        {moment(match.startedAt).format('MMMM DD HH:mm').toUpperCase()}
                                                    </span>
                                                    <span className="matches__match__duration__label">
                                                        {moment(match.endedAt).diff(moment(match.startedAt), 'minutes') + 'M'}
                                                    </span>
                                                    <span className="matches__match__duration__label">
                                                        {moment(match.endedAt).format('MMMM DD HH:mm').toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="row middle-xs">
                                                    <div className="col-xs matches__match__team left">
                                                        <div className="text-truncate">
                                                            {match.left.team}
                                                        </div>
                                                    </div>
                                                    <div className="col-xs text-center matches__match__points-col">
                                                        <div className="matches__match__team__points">
                                                            {match.left.points}
                                                        </div>
                                                    </div>
                                                    <div className="col-xs text-center matches__match__vs">&times;</div>
                                                    <div className="col-xs text-center matches__match__points-col">
                                                        <div className="matches__match__team__points">
                                                            {match.right.points}
                                                        </div>
                                                    </div>
                                                    <div className="col-xs matches__match__team right">
                                                        <div className="text-truncate">
                                                            {match.right.team}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                        :
                        (
                            (this.state.loading) ? ('') : (
                                    <div className="matches__loading aph p-40-bot">
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
export default Matches;

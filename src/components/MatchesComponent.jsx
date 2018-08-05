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
            .limit(40)
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
            <div className="matches">
                <h3 className="aph">
                    Latest Matches
                </h3>
                {
                    (this.state.loading) ?
                        (
                            <div className="matches__loading">
                                Matches...
                            </div>
                        )
                        :
                        ('')
                }
                {
                    (this.state.matches.length) ?
                        (
                            <div className="aph m--20-hor-xs">
                                {this.state.matches.map((match, matchId) =>
                                    <div className="matches__match"
                                         key={matchId}>
                                        <div className="matches__match__duration text-center">
                                            <span className="matches__match__duration__label">
                                                {moment(match.startedAt).format('MMMM DD HH:mm').toUpperCase()}
                                            </span>
                                            <span className="matches__match__duration__label">
                                                {moment(match.endedAt).diff(moment(match.startedAt), 'minutes') + ' '}
                                                MINUTES
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
                                            <div className="col-xs-2 col-sm-1 text-center">
                                                <div className="matches__match__team__points">
                                                    {match.left.points}
                                                </div>
                                            </div>
                                            <div className="col-xs-1 text-center">&times;</div>
                                            <div className="col-xs-2 col-sm-1 text-center">
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
                                )}
                            </div>
                        )
                        :
                        (
                            <div className="matches__loading">
                                Sorry, no data
                            </div>
                        )
                    }
            </div>
        );
    }
}

/* Export */
export default Matches;

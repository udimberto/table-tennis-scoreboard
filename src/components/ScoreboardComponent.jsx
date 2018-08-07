/* Modules */
import React, { Component } from 'react';

/* Services */
import { matchesService as matches, settingsService as settings } from '../services';

/* Components */
import Side from './ScoreboardSideComponent';

/* Context */
const MatchContext = React.createContext(matches.get());

/* Component */
class Scoreboard extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props    = props;
        this.state    = matches.get();
        this.settings = settings.get();

        this.add         = this.add.bind(this);
        this.remove      = this.remove.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.restart     = this.restart.bind(this);
        this.start       = this.start.bind(this);
    }

    /* Add */
    add(side) {
        if ((this.state[side].points) === this.settings.max) {
            return;
        }

        this.setState({
            ...this.state,
            [side]: {
                ...this.state[side],
                points: (this.state[side].points + 1),
            }
        }, this.checkScore);
    }

    /* Remove */
    remove(side) {
        if (this.state[side].points <= 0) {
            return;
        }

        this.setState({
            ...this.state,
            [side]: {
                ...this.state[side],
                points: (this.state[side].points - 1),
            }
        }, this.checkScore);
    }

    /* Handle Input */
    handleInput(evt) {
        this.setState({
            ...this.state,
            [evt.target.name]: {
                ...this.state[evt.target.name],
                team: evt.target.value.toUpperCase(),
            }
        });
    }

    /* Handle Score */
    handleScore(side) {
        if (this.state[side].points < this.settings.max) {
            return;
        }

        if (!window.confirm('MATCH REALY ENDED?')) {
            this.setState({
                ...this.state,
                [side]: {
                    ...this.state[side],
                    points: (this.state[side].points - 1)
                }
            });

            return;
        }

        this.end();
    }

    /* Check Score */
    checkScore() {
        const max   = this.settings.max;
        const toEnd = (max - 1);
        const isOt  =
            (this.state.left.points === toEnd) &&
            (this.state.right.points === toEnd)
        ;

        if (isOt) {
            this.settings.max = (max + (max - toEnd));
            return;
        }

        this.handleScore('left');
        this.handleScore('right');
    }

    /* Reset Values */
    resetValues(teamLeft, teamRight) {
        const _winner    = this.state.winner;
        const _teamLeft  = teamLeft || (this.state.left.team);
        const _teamRight = teamRight || (this.state.right.team);

        this.setState(
            matches.get(),
            () => {
                this.setState({
                    ...this.state,
                    left: {
                        ...this.state.left,
                        team: _winner === 'left' ? _teamLeft : '',
                    },
                    right: {
                        ...this.state.right,
                        team: _winner === 'right' ? _teamRight : '',
                    },
                })
            }
        );
    }

    /* Restart */
    restart() {
        const teamLeft   = (this.state.left.team || 'GHOST1');
        const teamRight  = (this.state.right.team || 'GHOST2');
        const confirmMsg =
            'MATCH IN PROGRESS\n' +
            teamLeft +
            ' ' +
            this.state.left.points +
            ' x ' +
            this.state.right.points +
            ' ' +
            teamRight +
            '\nDO YOU WANT TO RESTART?'
        ;

        if (!window.confirm(confirmMsg)) {
            return;
        }

        this.resetValues(teamLeft, teamRight);
    }

    /* End Match */
    end() {
        const winnerTeamSide =
            (this.state.left.points > this.state.right.points) ?
                'left'
                :
                'right'
        ;
        const winnerTeam = this.state[winnerTeamSide].team;

        if (!winnerTeam) {
            window.alert('THE WINNER TEAM doesn\'t have a name.\nSo, it\'s not been saved to our database.');
        }

        this.setState({
            ...this.state,
            status: 'ended',
            winner: winnerTeamSide,
        }, () => {
            this.settings = settings.get(true);

            if (!winnerTeam) {
                return;
            }

            matches.save(Object.assign({}, this.state));
        });
    }

    /* Start Over */
    start() {
        this.settings = settings.get(true);
        this.resetValues();
    }

    render() {
        return (
            <MatchContext.Provider value={this.state}>
                <section className="scoreboard aph m-20-top m-30-top-xs no-select">
                    <div className="aph container text-center">
                        <div className="row center-xs middle-xs">
                            <div className="col-xs scoreboard__side text-center">
                                <MatchContext.Consumer>
                                    {
                                        match =>
                                            <Side id="left" {...this.state.left}
                                                  add={ () => this.add('left') }
                                                  remove={ () => this.remove('left') }
                                                  started={this.state.left.points || this.state.right.points}
                                                  disabled={this.state.status === 'ended'}
                                                  handleInput={this.handleInput}
                                                  settings={this.settings} />
                                    }
                                </MatchContext.Consumer>
                            </div>
                            <div className="col-xs scoreboard__vs text-center">&times;</div>
                            <div className="col-xs scoreboard__side text-center">
                                <MatchContext.Consumer>
                                    {
                                        match =>
                                            <Side id="right" {...this.state.right}
                                                  add={ () => this.add('right') }
                                                  remove={ () => this.remove('right') }
                                                  started={this.state.left.points || this.state.right.points}
                                                  disabled={this.state.status === 'ended'}
                                                  handleInput={this.handleInput}
                                                  settings={this.settings} />
                                    }
                                </MatchContext.Consumer>
                            </div>
                        </div>

                        <div className="row center-xs middle-xs aph m-40-top">
                            <div className="col-xs-8 col-sm-4 col-md-4 col-lg-4">
                                <div className="aph p-20-top">
                                    {
                                        (this.state.status !== 'ended') ?
                                            (
                                                <button className="aph btn btn--bordered btn--block btn--white"
                                                        type="button"
                                                        tabIndex="-1"
                                                        disabled={
                                                            (!this.state.left.points) &&
                                                            (!this.state.right.points)
                                                        }
                                                        onClick={this.restart}>
                                                    RESTART
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="aph btn btn--bordered btn--block btn--white"
                                                        type="button"
                                                        tabIndex="-1"
                                                        onClick={this.start}>
                                                    NEW MATCH
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MatchContext.Provider>
        );
    }
}

/* Export */
export default Scoreboard;

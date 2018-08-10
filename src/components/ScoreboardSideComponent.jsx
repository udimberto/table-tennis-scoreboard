/* Modules */
import React, { Component } from 'react';

import Autocomplete from './AutocompleteComponent';

/* Component */
class ScoreboardSide extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = props;

        this.setTeam = this.setTeam.bind(this);
    }

    /* Will Receive Props */
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            ...nextProps
        });
    }

    /* Set team name */
    setTeam(teamName) {
        this.setState({
            ...this.state,
            team: teamName,
        }, () => {
            this.state.handleInput({
                target: {
                    name : this.state.id,
                    value: teamName,
                }
            });
        });
    }

    render() {
        return (
            <div className="scoreboard__side">
                <div className="scoreboard__side__team">
                    <Autocomplete
                        id={this.state.id.toUpperCase()}
                        ranking={this.props.ranking}
                        callback={this.setTeam}
                        value={this.state.team}
                        disabled={this.state.started || this.state.disabled}
                        placeholder={this.state.id.toUpperCase() + ' team'} />
                </div>
                <div>
                    <div className="scoreboard__side__points">
                        {this.state.points}
                    </div>
                </div>
                {
                    (this.state.id === 'left') ?
                        (
                            <div className="scoreboard__side__actions row middle-xs">
                                <div className="col-xs-6 text-right">
                                    <button className="scoreboard__side__btn"
                                            type="button"
                                            tabIndex="-1"
                                            disabled={this.state.points >= this.state.settings.max || this.state.disabled}
                                            id={`scoreboardSide${this.state.id}BtnAdd`}
                                            onClick={this.props.add}>
                                        +
                                    </button>
                                </div>
                                <div className="col-xs-6 text-center">
                                    <button className={`scoreboard__side__btn xs ${this.state.id}`}
                                            type="button"
                                            tabIndex="-1"
                                            disabled={this.state.points <= 0 || this.state.disabled}
                                            id={`scoreboardSide${this.state.id}BtnRemove`}
                                            onClick={this.props.remove}>
                                        —
                                    </button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="scoreboard__side__actions row middle-xs">
                                <div className="col-xs-6 text-center">
                                    <button className={`scoreboard__side__btn xs ${this.state.id}`}
                                            type="button"
                                            tabIndex="-1"
                                            disabled={this.state.points <= 0 || this.state.disabled}
                                            id={`scoreboardSide${this.state.id}BtnRemove`}
                                            onClick={this.props.remove}>
                                        —
                                    </button>
                                </div>
                                <div className="col-xs-6 text-left">
                                    <button className="scoreboard__side__btn"
                                            type="button"
                                            tabIndex="-1"
                                            disabled={this.state.points >= this.state.settings.max || this.state.disabled}
                                            id={`scoreboardSide${this.state.id}BtnAdd`}
                                            onClick={this.props.add}>
                                        +
                                    </button>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }
}

/* Export */
export default ScoreboardSide;

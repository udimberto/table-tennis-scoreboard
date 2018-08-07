/* Modules */
import React, { Component } from 'react';

/* Component */
class ScoreboardSide extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.state = props;
    }

    /* Mount */
    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return (
            <div className="scoreboard__side">
                <button className="scoreboard__side__btn"
                        type="button"
                        tabIndex="-1"
                        disabled={this.state.points <= 0 || this.state.disabled}
                        id={`scoreboardSide${this.state.id}BtnRemove`}
                        onClick={this.props.remove}>
                    —
                </button>
                <div>
                    <div className="scoreboard__side__points">
                        {this.state.points}
                    </div>
                </div>
                <div className="scoreboard__side__team">
                    <input className="aph form__control text-center"
                           type="text"
                           id={this.state.id}
                           name={this.state.id}
                           value={this.state.team}
                           disabled={this.state.started || this.state.disabled}
                           placeholder={this.state.id.toUpperCase() + ' team'}
                           onChange={this.state.handleInput} />
                </div>
                <button className="scoreboard__side__btn"
                        type="button"
                        tabIndex="-1"
                        disabled={this.state.points >= this.state.settings.max || this.state.disabled}
                        id={`scoreboardSide${this.state.id}BtnAdd`}
                        onClick={this.props.add}>
                    +
                </button>
            </div>
        );
    }
}

/* Export */
export default ScoreboardSide;

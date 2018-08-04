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
                        disabled={this.state.points <= 0}
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
                           placeholder={this.state.id.toUpperCase() + ' player'}
                           onChange={this.state.handleInput} />
                </div>
                <button className="scoreboard__side__btn"
                        type="button"
                        disabled={this.state.points >= this.state.settings.max}
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

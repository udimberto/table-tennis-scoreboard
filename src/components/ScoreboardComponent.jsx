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
        this.end         = this.end.bind(this);
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
                team: evt.target.value,
            }
        });
    }

    checkScore() {
        console.log('checkScore');
    }

    reset() {
        this.settings = settings.get();
        this.setState(matches.get());
    }

    /* End */
    end() {

    }

    render() {
        return (
            <MatchContext.Provider value={this.state}>
                <section className="scoreboard">
                    <div className="aph container text-center">
                        <div className="row center-xs middle-xs">
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                                <div className="aph p-40-ver">
                                    <button className="aph btn btn--bordered btn--block btn--white"
                                            type="button"
                                            disabled={
                                                (this.state.left.points !== this.settings.max) &&
                                                (this.state.right.points !== this.settings.max)
                                            }
                                            onClick={this.end}>
                                        FINISH
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row center-xs middle-xs">
                            <div className="col-xs scoreboard__side text-center">
                                <MatchContext.Consumer>
                                    {
                                        match =>
                                            <Side id="left" {...this.state.left}
                                                  add={ () => this.add('left') }
                                                  remove={ () => this.remove('left') }
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
                                                  handleInput={this.handleInput}
                                                  settings={this.settings} />
                                    }
                                </MatchContext.Consumer>
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

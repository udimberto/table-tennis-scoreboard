/* Modules */
import React, { Component } from 'react';

/* Services */
import { settingsService as settings } from '../services';

/* Component */
class Drawer extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = settings.get();

        this.save        = this.save.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* Handle input */
    handleInput(evt) {
        const name  = evt.target.name;
        const value = evt.target.value;

        this.setState({
            [name]: parseInt(value, 10),
        });
    }

    /* Save Settings */
    save() {
        console.log('should save', this.state);
        settings.set(this.state);
        this.props.toggleDrawer();
    }

    /* Render */
    render() {
        return (
            <div className="aph drawer right left-xs p-40-bot"
                 id={this.props.id || 'drawerMenu'}>
                <h3 className="aph text-white m-5-top">
                    Match Settings
                </h3>
                <ul className="aph list list--inverted drawer__menu">
                    <li className="aph list__item">
                        <div className="row middle-xs">
                            <div className="col-xs-8">
                                <label className="aph form__label"
                                       htmlFor="max">
                                    MAX POINTS
                                </label>
                            </div>
                            <div className="col-xs-4">
                                <input className="aph form__control"
                                       type="number"
                                       min="7"
                                       id="max"
                                       name="max"
                                       onChange={this.handleInput}
                                       value={this.state.max} />
                            </div>
                        </div>
                    </li>
                    <li className="aph list__item">
                        <div className="row middle-xs">
                            <div className="col-xs-8">
                                <label className="aph form__label"
                                       htmlFor="ot">
                                    OVERTIME POINTS
                                </label>
                            </div>
                            <div className="col-xs-4">
                                <input className="aph form__control"
                                       type="number"
                                       min="2"
                                       id="ot"
                                       name="ot"
                                       onChange={this.handleInput}
                                       value={this.state.ot} />
                            </div>
                        </div>
                    </li>
                    <li className="aph list__item">
                        <div className="row middle-xs">
                            <div className="col-xs-8">
                                <label className="aph form__label"
                                       htmlFor="bestOf">
                                    BEST OF
                                </label>
                            </div>
                            <div className="col-xs-4">
                                <input className="aph form__control"
                                       type="number"
                                       min="1"
                                       id="bestOf"
                                       name="bestOf"
                                       onChange={this.handleInput}
                                       value={this.state.bestOf} />
                            </div>
                        </div>
                    </li>
                    <li className="aph list__item p-40-bot">
                        <div className="aph p-10-ver m-15-top">
                            <button className="aph btn btn--bordered btn--block btn--white"
                                    type="button"
                                    id="settingsSaveBtn"
                                    onClick={this.save}>
                                Save
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

/* Export Component */
export default Drawer;

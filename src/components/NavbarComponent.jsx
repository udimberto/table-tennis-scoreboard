/* Modules */
import React, { Component } from 'react';

/* Components */
import DrawerSettingsRanking from './DrawerSettingsRankingComponent';

/* Images */
import logo from '../images/icon_ping-pong.svg';

/* Component */
class Navbar extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;
        this.drawerSettingsRanking = null;

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    /* Mount */
    componentDidMount() {
        this.drawerSettingsRanking = document.getElementById('drawerSettingsRanking');

        window.addEventListener('click', this.triggerDrawer);
    }

    /* Drawer Trigger */
    triggerDrawer(evt) {
        if (!this.drawerSettingsRanking) {
            return;
        }

        const isTriggerToMenu =
            (evt.target.id === 'drawerSettingsRankingToggleBtn' || evt.target.id === 'drawerSettingsRankingToggle') || (
                evt.path ?
                    evt.path.some((element) => {
                        return element.id === 'drawerSettingsRanking';
                    })
                    :
                    (evt.target.tagName === 'INPUT' || evt.target.tagName === 'LABEL')
                )
        ;

        if (isTriggerToMenu) {
            return;
        }

        this.drawerSettingsRanking.classList.remove('active');
    }

    /* Toggle Drawer */
    toggleDrawer() {
        if (!this.drawerSettingsRanking) {
            return;
        }

        this.drawerSettingsRanking.classList.toggle('active');
    }

    /* Render */
    render() {
        return (
            <nav>
                <div className="aph navbar navbar--inverted navbar--fixed-top">
                    <div className="aph container fluid">
                        <div className="aph navbar__nav">
                            <span className="aph navbar__brand">
                                <img className="aph navbar__brand__logo m-10-right m-0-right-xs"
                                     src={logo}
                                     alt="Ping Pong" />
                                <span className="aph navbar__brand__title">
                                    table tennis scoreboard
                                </span>
                            </span>
                            <ul className="aph navbar__menu navbar__menu--right list">
                                <li className="aph list__item m-0">
                                    <button className="aph btn btn--link btn--white"
                                            type="button"
                                            id="drawerSettingsRankingToggleBtn"
                                            onClick={this.toggleDrawer}>
                                        Settings
                                    </button>
                                </li>
                            </ul>
                            <button className="aph navbar__menu__drawer"
                                    type="button"
                                    id="drawerSettingsRankingToggle"
                                    onClick={this.toggleDrawer}>
                                <span className="aph navbar__menu__drawer__hamburguer"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <DrawerSettingsRanking id="drawerSettingsRanking" toggleDrawer={this.toggleDrawer} />
            </nav>
        )
    }
}

/* Export Component */
export default Navbar;

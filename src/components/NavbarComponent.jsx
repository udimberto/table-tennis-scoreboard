/* Modules */
import React, { Component } from 'react';

/* Components */
import Matches from './MatchesComponent';
import Ranking from './RankingComponent';

/* Images */
import logo from '../images/icon_ping-pong.svg';
import trophy from '../images/icon_trophy.svg';
import score from '../images/icon_scoreboard.svg';

/* Component */
class Navbar extends Component {

    /* Constructor */
    constructor(props) {
        super(props);

        this.props = props;

        this.drawerMatches = null;
        this.drawerRanking = null;

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    /* Mount */
    componentDidMount() {
        this.drawerMatches = document.getElementById('drawerMatches');
        this.drawerRanking = document.getElementById('drawerRanking');

        window.addEventListener('click', this.triggerDrawer);
    }

    /* Drawer Trigger */
    triggerDrawer(evt) {
        if (!this.drawerMatches && !this.drawerRanking) {
            return;
        }

        const isTriggerToMenu =
            (evt.target.id === 'drawerMatchesToggleBtn' || evt.target.id === 'drawerMatchesToggle') ||
            (evt.target.id === 'drawerRankingToggleBtn' || evt.target.id === 'drawerRankingToggle') || (
                evt.path ?
                    evt.path.some((element) => {
                        return element.id === 'drawerMatches' || element.id === 'drawerRanking';
                    })
                    :
                    (evt.target.tagName === 'INPUT' || evt.target.tagName === 'LABEL')
                )
        ;

        if (isTriggerToMenu) {
            return;
        }

        this.drawerMatches.classList.remove('active');
        this.drawerRanking.classList.remove('active');
    }

    /* Toggle Drawer */
    toggleDrawer(drawerId) {
        if (!this.drawerMatches && !this.drawerRanking) {
            return;
        }

        if (drawerId && this[drawerId]) {
            this[drawerId].classList.toggle('active');

            if (drawerId === 'drawerMatches') {
                this.drawerRanking.classList.remove('active');
            } else {
                this.drawerMatches.classList.remove('active');
            }

            return;
        }

        this.drawerMatches.classList.toggle('active');
        this.drawerRanking.classList.toggle('active');
    }

    /* Render */
    render() {
        return (
            <nav>
                <div className="aph navbar navbar--inverted navbar--fixed-top no-select">
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
                                            id="drawerRankingToggleBtn"
                                            onClick={() => this.toggleDrawer('drawerRanking')}>
                                        ranking
                                    </button>
                                </li>
                                <li className="aph list__item m-0">
                                    <button className="aph btn btn--link btn--white"
                                            type="button"
                                            id="drawerMatchesToggleBtn"
                                            onClick={() => this.toggleDrawer('drawerMatches')}>
                                        matches
                                    </button>
                                </li>
                            </ul>
                            <button className="aph navbar__menu__drawer"
                                    type="button"
                                    id="drawerRankingToggle"
                                    onClick={() => this.toggleDrawer('drawerRanking')}
                                    style={ { backgroundImage: `url(${trophy})` } }>
                                ranking
                            </button>
                            <button className="aph navbar__menu__drawer right"
                                    type="button"
                                    id="drawerRankingToggle"
                                    onClick={() => this.toggleDrawer('drawerMatches')}
                                    style={ { backgroundImage: `url(${score})` } }>
                                matches
                            </button>
                        </div>
                    </div>
                </div>
                <div id="drawerMatches" className="aph drawer right lg no-select p-40-bot p-0-hor">
                    <Matches />
                </div>
                <div id="drawerRanking" className="aph drawer lg no-select p-40-bot">
                    <div className="aph p-40-bot">
                        <Ranking />
                    </div>
                </div>
            </nav>
        )
    }
}

/* Export Component */
export default Navbar;

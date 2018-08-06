/* Modules */
import React, { Component } from 'react';

/* Components */
import Navbar from './components/NavbarComponent';
import Matches from './components/MatchesComponent';
import Ranking from './components/RankingComponent';
import Scoreboard from './components/ScoreboardComponent';

class App extends Component {
    render() {
        return (
            <div className="aph flex__item">
                <Navbar />
                <Scoreboard />
                <div className="aph container fluid p-40-bot p-0-bot-xs">
                    <div className="row top-xs">
                        <div className="col-xs-12 col-sm-12 col-md-5 first-xs first-sm last-md">
                            <div className="aph p-10-top p-0-top-xs">
                                <Ranking />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-7">
                            <div className="aph p-10-top p-30-top-xs">
                                <Matches />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

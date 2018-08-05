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
                <div className="aph container fluid p-40-bot">
                    <div className="row top-xs">
                        <div className="col-xs-12 col-sm-12 col-md-5 first-xs first-sm last-md">
                            <div className="aph p-10-ver">
                                <Ranking />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-7">
                            <div className="aph p-10-ver">
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

// Score.js

import React, {Component} from 'react';
import '../App.css'

class Score extends Component {
    render() {
        const {score, onNextQuestion} = this.props;

        return (
            <div>
                <h2>Results (on a scale from ethics to vicodin, how important are you to House?)</h2>
                <h4>Your score: {score}</h4>
            </div>
        );
    }
}

export default Score;
// HelpComponent.js
import React from 'react';
import './HelpComponent.css';
const HelpComponent = ({ show, handleClose }) => {
    return (
        show && (
            <div className="instructions-overlay">
                <div className="instructions-content">
                    <h2>Instructions</h2>
                    <ul>
                        <li>Step 1: Click "Start Game" to begin.</li>
                        <li>Step 2: Click on a dice to freeze or unfreeze it.</li>
                        <li>Step 3: Roll the dice to match a winning combination.</li>
                        <li>Step 4: The timer will start when the game begins.</li>
                        <li>Step 5: Win the game by matching all dice to the same number.</li>
                    </ul>
                    <button className="close-button" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        )
    );
};
export default HelpComponent;
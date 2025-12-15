// GameComponent.js
import React, { useState, useEffect } from 'react';
import './GameComponent.css';
import { Button, Card, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faRedo, faPlay, faCheckCircle, faClock, faSync }
    from '@fortawesome/free-solid-svg-icons';
import HelpComponent from './HelpComponent';

const GameComponent = () => {
    const [dice, set_Dice] = useState(Array(10).fill(1));
    const [roll, set_Rolls] = useState(0);
    const [gamewin, set_game_win] = useState(false);
    const [dfreeze, set_d_freeze] = useState(Array(10).fill(false));
    const [time, set_Time] = useState(0);
    const [timerun, set_Time_Run] = useState(false);
    const [gamestart, set_game_start] = useState(false);
    const [showhelp, set_show_help] = useState(false);
    const [playAgain, set_play_again] = useState(false);
    const rolldFunction = () => {
        if (gamestart && !gamewin && timerun) {
            const newd = dice.map((value, index) => {
                if (!dfreeze[index]) {
                    return Math.floor(Math.random() * 6) + 1;
                }
                return value;
            });
            set_Dice(newd);
            set_Rolls(roll + 1);
        }
        else {
            alert('Please start the game first!');
        }
    };
    const gamePlayFuntion = () => {
        if (playAgain) {
            newresetFuntion();
            set_play_again(false);
            set_game_start(true);
            set_Time_Run(true);
        }
        else if (!gamestart) {
            newresetFuntion();
            set_game_start(true);
            set_Time_Run(true);
        }
    };
    const newresetFuntion = () => {
        const initialDice = Array(10).fill(1).map(() => Math.floor(Math.random() * 6) + 1);
        set_Dice(initialDice);
        set_Rolls(0);
        set_game_win(false);
        set_d_freeze(Array(10).fill(false));
        set_Time(0);
        set_Time_Run(false);
    };

    const dFreezeFunction = (index) => {
        if (!gamewin && gamestart) {
            const newFrozen = [...dfreeze];
            newFrozen[index] = !newFrozen[index];
            set_d_freeze(newFrozen);
        }
    };

    useEffect(() => {
        if (timerun && time < 60) {
            const timerInterval = setInterval(() => {
                if (timerun) {
                    set_Time(time + 1);
                } else {
                    clearInterval(timerInterval);
                }
            }, 1000);
            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [timerun, time]);


    // Enable Play Again button
    useEffect(() => {
        if (dice.every((value) => value === dice[0]) && gamestart) {
            set_game_win(true);
            set_Time_Run(false);
            set_play_again(true);
        }
    }, [dice, gamestart]);
    return (
        <Container>
            <Card className="tenzies-game">
                <Card.Header as="h1" className="green-header">
                    GeeksforGeeks Tenzies Game
                </Card.Header>

                <Card.Body>
                    <div
                        className="instructions-container"
                        style={{ display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center' }}>
                        <Button variant="info"
                                onClick={() => set_show_help(true)}
                                size="lg">
                            <FontAwesomeIcon icon={faPlay} />
                            Show Instructions
                        </Button>
                    </div>
                    <div className="dice-container">
                        {dice.map((value, index) => (
                            <div key={index}
                                 className={`dice ${dfreeze[index] ? 'frozen' : ''}`}
                                 onClick={() => dFreezeFunction(index)}>
                                {value}
                            </div>
                        ))}
                    </div>
                    <Button variant="success"
                            onClick={rolldFunction}
                            disabled={gamewin || !timerun}
                            size="lg"
                            block>
                        <FontAwesomeIcon icon={faDice} />
                        Roll Dice
                    </Button>
                    <p className="status">
                        <FontAwesomeIcon icon={faSync} />
                        Rolls: {roll}
                    </p>
                    <p className="status">
                        <FontAwesomeIcon icon={faClock} />
                        Time Elapsed: {time} seconds
                    </p>
                    <div className="buttons">
                        <Button variant="primary"
                                onClick={gamePlayFuntion}
                                size="lg"
                                block>
                            {playAgain ? (

                                // Display Play Again button when user wins
                                <span>
									<FontAwesomeIcon icon={faPlay} /> Play Again
								</span>
                            ) : (
                                <span>
									<FontAwesomeIcon icon={faPlay} /> Start Game
								</span>
                            )}
                        </Button>
                    </div>
                    {gamewin && (
                        <div className="win-message">
                            <p>
                                You've won! Congratulations!{' '}
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </p>
                        </div>
                    )}
                </Card.Body>
            </Card>
            <HelpComponent show={showhelp} handleClose={() => set_show_help(false)} />
        </Container>
    );
};
export default GameComponent;
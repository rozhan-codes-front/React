import React, {Component} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
import loginContext, {LoginContext} from "../contexts/LoginContext";


class Navbar extends Component {
    // static contextType =LoginContext;
    render() {
        return (
            <LoginContext.Consumer>
                {(loginContext) => (
                    <ThemeContext.Consumer>
                        {
                            (context) => {
                                const {isLight, dark, light} = context;
                                const theme = isLight ? light : dark;
                                const {login, changeLogin} = loginContext;
                                return (
                                    <nav style={{background: theme.item, color: theme.text}}>
                                        <div onClick={changeLogin}>
                                            {login ? 'شما وارد سایت شده اید' : 'لطفا وارد سایت شوید'}
                                        </div>
                                        <h1>
                                            <ul>
                                                <li>خانه</li>
                                                <li>درباره ما</li>
                                                <li>تماس با ما</li>
                                            </ul>
                                        </h1>
                                    </nav>
                                )
                            }}
                    </ThemeContext.Consumer>
                )
                }
            </LoginContext.Consumer>

        );
    }
}

export default Navbar;
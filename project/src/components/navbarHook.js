import React, {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import {LoginContext} from "../contexts/LoginContext";

const NavbarHook=()=>{
    const {isLight, dark, light} = useContext(ThemeContext)
    const {login, changeLogin} = useContext(LoginContext)
    const theme = isLight ? light : dark;
    return(
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
    );
}

export default NavbarHook;
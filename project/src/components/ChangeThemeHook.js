import React, {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

const ChangeThemeHook =() =>{
    const {changeTheme} = useContext(ThemeContext);
    return(
        <button onClick={changeTheme}>
            تغییر تم
        </button>
    );
}

export default ChangeThemeHook;
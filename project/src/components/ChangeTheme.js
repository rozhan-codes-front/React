import React, {Component} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

class ChangeTheme extends Component {

    static contextType = ThemeContext;
    render() {
        const {changeTheme} = this.context;
        return(
            <button onClick={changeTheme}>
                تغییر تم
            </button>
        );
    }
}

export default ChangeTheme;
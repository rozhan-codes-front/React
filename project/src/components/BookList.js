import React, {Component} from "react";
import {ThemeContext} from "../contexts/ThemeContext";

class BookList extends Component {
    static contextType = ThemeContext;
    render() {
        const {isLight, dark, light} = this.context;
        const theme = isLight ? light : dark;
        return(
            <div className='book-list' style={{background: theme.bg, color: theme.text}}>
                <ul>
                    <li style={{background:theme.item}}>سووشون</li>
                    <li style={{background:theme.item}}>مردی به نام اوه</li>
                    <li style={{background:theme.item}}>معلم پیانو</li>
                </ul>
            </div>

        );
    }
}

export default BookList
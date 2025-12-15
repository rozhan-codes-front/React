import React, {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import {BookContextHook} from "../contexts/BookContextHook";

const BookListHook =()=>{
    const {isLight, dark, light} = useContext(ThemeContext);
    const theme = isLight ? light : dark;
    const {books} = useContext(BookContextHook);
    return(
        <div className='book-list' style={{background: theme.bg, color: theme.text}}>
            <ul>
                {/*<li style={{background:theme.item}}>سووشون</li>*/}
                {/*<li style={{background:theme.item}}>مردی به نام اوه</li>*/}
                {/*<li style={{background:theme.item}}>معلم پیانو</li>*/}
                {books.map(book => {
                    return (
                        <li style={{background:theme.item}} key={book.id}>{book.title}</li>
                    )
                    }
                )}
            </ul>
        </div>
    );
}

export default BookListHook;
import React, {createContext, useState, useReducer} from "react";
import {v4 as uuid} from 'uuid';
import {BookReducer} from "../reducers/BookReducer";

export const BookContext = createContext();
const BookContentProvider = (props) => {
    const [books,dispatch] = useReducer(BookReducer, [])
    // const [books, setBook] = useState([
    //     {title: 'صد سال تنهایی', author: 'گابریل مارکز', id: 1},
    //     {title: 'کیمیاگر', author: 'پائولو کوئینو', id: 2}
    // ])

    // const removeBook =(id)=>{
    //     setBook(books.filter(book => book.id !== id))
    // }
    //
    // const addBook = (title, author)=>{
    //     setBook([...books, {title,author, id:uuid()}])
    // }
    return(
        <BookContext.Provider value={{books, dispatch}}>
            {props.children}
        </BookContext.Provider>
    );
}

export default BookContentProvider;
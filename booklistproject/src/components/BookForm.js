import React, {useState, useContext, useReducer} from "react";
import {BookContext} from "../contexts/BookContext";
import {BookReducer} from "../reducers/BookReducer";

const BookForm = ()=>{
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    // const {addBook} = useContext(BookContext);

    const {dispatch} = useContext(BookContext)
    const handleSubmit =(e)=>{
        e.preventDefault();
        // addBook(title, author);
        dispatch({type:'ADD_BOOK', book:{
            title,author
            }})
        setAuthor('');
        setTitle('');
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} required
            onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="نام کتاب" value={author} required
            onChange={(e)=>setAuthor(e.target.value)}/>
            <input type="submit" placeholder="نام نویسنده" value="ثبت کتاب"/>
        </form>
    );
}

export default BookForm;
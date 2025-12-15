import React, {useContext} from "react";
import {BookContext} from "../contexts/BookContext";
import BookDetails from "./BookDetails";

const BookList = () =>{
    const {books} = useContext(BookContext)
    return books.length?(
        <div className="book-list">
            <ul>
                {books.map(book=> {
                    return(
                        <BookDetails key={books.id} book={book}></BookDetails>
                    )
                })}
            </ul>
        </div>
    ):(
        <div className="empty">
            هیچ کتابی یافت نشد
        </div>
    );
}

export default BookList;
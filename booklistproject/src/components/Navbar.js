import React, {useContext} from "react";
import {BookContext} from "../contexts/BookContext";

const Navbar =()=>{
    const {books} = useContext(BookContext)
    return(
        <div className="navbar">
            <h1>لیست کتابهای من</h1>
            <p>
                اکنون شما
                {books.length}
                کتاب برای مطالعه دارید
            </p>
        </div>
    );
}

export default Navbar;
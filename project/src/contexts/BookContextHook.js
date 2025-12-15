import React,{createContext, useState} from "react";

export const BookContextHook = createContext()
const BookContextHookProvider=(props)=>{
    const [books, setBook] = useState([
        {title:  'چشمهایش' , id:1},
        {title:  'سووشون' , id:2},
        {title:  'مردی به نام اوه' , id:3},
    ])
    return(
        <BookContextHook.Provider value={{books}}>
            {props.children}
        </BookContextHook.Provider>
    );
}
export default BookContextHookProvider;
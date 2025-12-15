import React from "react";
import Person from "./Person";

function NameList() {
    const people = [
        {
            id:1,
            name: 'Rozhan',
            age: 23,
        },
        {
            id:2,
            name: 'Roshanak',
            age: 25,
        },
        {
            id:3,
            name: 'Narges',
            age: 23,
        }
    ]
    // const names = ['Rozhan', 'Roshanak', 'Narges'];
    // const nameList = names.map (name => <h2>{name}</h2>)
    const personList = people.map(person => <Person key={person.id} person = {person}/>)
    return (
        <div>
            {/*{nameList}*/}
            {personList}
        </div>
    )
}

export default NameList;
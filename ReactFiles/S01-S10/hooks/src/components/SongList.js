import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import NewSongForm from './NewSongForm';

const SongList = () => {
    const [songs, setSongs] = useState([
        { title: 'Music one', id: 1 },
        { title: 'Music two', id: 2 },
        { title: 'Music three', id: 3 }
    ]);

    const [age, setAge] = useState(20)

//   const  addSong = ()=>{
//         // setSongs([...songs, {title: 'New music', id: 4}])
//         setSongs([...songs, {title: 'New music', id: uuid()}])
//     }

const  addSong = (title) =>{
    setSongs([...songs, {title, id: uuid()}])
}

useEffect(()=>{
    console.log('useEffect hook', songs)
}, [songs])

useEffect(()=>{
    console.log('useEffect hook', age)
}, [age])
    return (
        <div>
            {/* <ul>
                <li>Music one</li>
                <li>Music two</li>
            </ul> */}
            <ul>
                {
                    songs.map(song => <li key={song.id}>{song.title}</li>)
                }
            </ul>
            {/* <button onClick={addSong}>
                Add new song
            </button> */}
            <NewSongForm addSong={addSong}/>
            <button onClick={()=>setAge(age+1)}>Add 1 to age</button>
        </div>
    );
}

export default SongList;
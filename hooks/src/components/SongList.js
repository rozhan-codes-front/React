import React, {useState, useEffect} from "react";
import {v4 as uuid} from 'uuid';
import NewSongForm from "./NewSongForm";

const SongList = () => {
    const [songs, setSong] = useState([
        {title: 'Music One', id: 1},
        {title: 'Music Two', id: 2},
        {title: 'Music Three', id: 3},
    ])

    useEffect(()=> console.log('use effect hook'), [songs])

    // const addSong = () => {
    //     // setSong([...songs, {title: 'New Song', id:4}])
    //     setSong([...songs, {title: 'New Song', id:uuid}])
    // }

    const addSong = (title) => {
        setSong([...songs, {title, id:uuid()}])
    }

    return (
      <ul>
          {/*<li>Music one</li>*/}
          {/*<li>Music Two</li>*/}
          {songs.map(song => <li key={song.id}>{song.title}</li>)}
          {/*<button onClick={addSong}>Add New Song</button>*/}
          <NewSongForm addSong={addSong}></NewSongForm>
      </ul>
    );
}

export default SongList;
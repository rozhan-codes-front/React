import React, {useState} from "react";

const NewSongForm = ({addSong}) => {
    const [title, setTitle] = useState('')
    const handleSubmit =(e)=> {
        e.preventDefault()
        addSong(title)
        setTitle('')
    }
    return (
      <form onSubmit={handleSubmit}>
          <label>New Song: </label>
          <input type="text" required value={title}
                 onChange={(e) => setTitle(e.target.value)}/>
          <button type="submit"> submit</button>
      </form>
    );
}

export default NewSongForm;
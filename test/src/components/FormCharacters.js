import React, { useState } from 'react';
function FormCharacters() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    return (
        <form>
            <label>
                name :
            </label><br/>
            <input name="name" type="text" value={name}
                   onChange={e => setName(e.target.value)} /><br/>
            {name}<br/>
            <label>
                password :
            </label><br/>
            <input name="age" type="password" value={age}
                   onChange={e => setAge(e.target.value)} /><br/>
            {age}<br/>
            <input type="submit" />
        </form>

    );
}

export default FormCharacters;
import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.jsx";
import Entry from "./components/Entry.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header></Header>
            <Entry></Entry>
        </>
    )
}

export default App

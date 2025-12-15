import logo from './logo.svg';
import './App.css';
import HelloWorld from "./components/HelloWorld";
import Welcome from "./components/Welcome";
import Counter from "./components/Counter";
import ClassClick from "./components/ClassClick";
import FunctionClick from "./components/FunctionClick";
import UserGreeting from "./components/UserGreeting";
import NameList from "./components/NameList";
import Form from "./components/Form";
import StyleSheet from "./components/StyleSheet";
import './appStyle.css'
import styles from './appStyles.module.css'
import {Route, BrowserRouter as Router, Routes, Link, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import FormCharacters from "./components/FormCharacters";

function App() {
    return (
        <div>
            <FormCharacters></FormCharacters>
        </div>
        // <Router>
        //     <div className="App">
        //         <p>
        //             lets add routing
        //         </p>
        //
        //         <nav>
        //             <ul>
        //                 <li><Link to="/">Home</Link></li>
        //                 <li><Link to="/about">About</Link></li>
        //             </ul>
        //         </nav>
        //         <Routes>
        //             <Route path="/" element={<Home />} />
        //             <Route path="/about" element={<About />} />
        //         </Routes>
        //
        //         {/*<h1 className='error'>error</h1>*/}
        //         {/*<h1 className={styles.success}>success</h1>*/}
        //         {/*<header className="App-header">*/}
        //         {/*  <img src={logo} className="App-logo" alt="logo" />*/}
        //         {/*  <p>*/}
        //         {/*    Edit <code>src/App.js</code> and save to reload.*/}
        //         {/*  </p>*/}
        //         {/*  <a*/}
        //         {/*    className="App-link"*/}
        //         {/*    href="https://reactjs.org"*/}
        //         {/*    target="_blank"*/}
        //         {/*    rel="noopener noreferrer"*/}
        //         {/*  >*/}
        //         {/*    Learn React*/}
        //         {/*  </a>*/}
        //         {/*</header>*/}
        //         {/*<HelloWorld name = "Rozhan"></HelloWorld>*/}
        //         {/*<Welcome user = "روژان "></Welcome>*/}
        //
        //         {/*<Counter></Counter>*/}
        //
        //         {/*<ClassClick></ClassClick>*/}
        //
        //         {/*<FunctionClick></FunctionClick>*/}
        //
        //         {/*<UserGreeting></UserGreeting>*/}
        //
        //         {/*<NameList></NameList>*/}
        //
        //         {/*<Form></Form>*/}
        //
        //         {/*<StyleSheet></StyleSheet>*/}
        //     </div>
        // </Router>
    );
}

export default App;

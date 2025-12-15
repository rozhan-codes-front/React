import Navbar from "./components/navbar";
import BookList from "./components/BookList";
import ThemeContextProvider from "./contexts/ThemeContext";
import ChangeTheme from "./components/ChangeTheme";
import LoginContextProvider from "./contexts/LoginContext";
import BookListHook from "./components/BookListHook";
import NavbarHook from "./components/navbarHook";
import ChangeThemeHook from "./components/ChangeThemeHook";
import BookContextHookProvider from "./contexts/BookContextHook";


function App() {
    return (
        <div className="App">
            <ThemeContextProvider>
                <LoginContextProvider>
                    {/*<Navbar></Navbar>*/}
                    <NavbarHook></NavbarHook>
                    {/*<BookList></BookList>*/}
                    <BookContextHookProvider>
                        <BookListHook></BookListHook>
                    </BookContextHookProvider>

                    {/*<ChangeTheme></ChangeTheme>*/}
                    <ChangeThemeHook></ChangeThemeHook>
                </LoginContextProvider>
            </ThemeContextProvider>
        </div>
    );
}

export default App;

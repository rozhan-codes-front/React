import React, {Component, createContext} from "react";

export const ThemeContext = createContext();
class ThemeContextProvider extends Component {
    state={
        isLight: true,
        light: {text: '#555', item: '#ddd', bg: '#eee'},
        dark: {text: '#ddd', item: '#333', bg: '#555'}
    }

    changeTheme =() => {
        this.setState({isLight: !this.state.isLight})
    }
    render() {
        return(
            <ThemeContext.Provider value={{...this.state, changeTheme: this.changeTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;
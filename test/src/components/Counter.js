import React, {Component} from "react";

class Counter extends Component {
    state = {
        count : 0
    }

    constructor() {
        super()
        console.log("constructor")
    }

    count = () => {
        this.setState({count:this.state.count+1}, ()=>{
            console.log(this.state.count)
        })
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate")
    }

    componentWillUnmount() {

    }

    componentDidCatch(error, errorInfo) {
    }

    render() {
        console.log("render")
        return (
            <div>
                <h1>
                    شماره{this.state.count}
                </h1>

                <button onClick={this.count}>شمارش</button>
            </div>
        );
    }
}

export default Counter;
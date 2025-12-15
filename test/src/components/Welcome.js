import React, {Component} from "react";

class Welcome extends Component {

    state = {
        message : 'به وبسایت ما خوش آمدید'
    }

    login = () => {
        this.setState({
            message: 'از ورود شما متشکریم'
        })
    }
    render() {
        return(
            <div>
                <h2>
                    {/*Welcome to Hell */}
                    {this.props.user}
                    {this.state.message}
                </h2>
                <button onClick={this.login}>
                    ورود
                </button>
            </div>

        )
    }
}

export default Welcome;
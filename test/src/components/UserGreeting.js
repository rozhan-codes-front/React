import React ,{Component} from "react";

class UserGreeting extends Component{
    state = {
        isLoggedIn : true

    }

    render() {
        // if (this.state.isLoggedIn) {
        //  return <div>Welcome Rozhan</div>
        // } else {
        //     return <div>Welcome Guest</div>
        // }

        // let message;
        // if (this.state.isLoggedIn) {
        //     message = <div>Welcome Rozhan</div>
        // } else {
        //     message = <div>Welcome Guest</div>
        // }
        //
        // return <div>{message}</div>


        // return (
        //     this.state.isLoggedIn ? <div>Welcome Rozhan</div> : <div>welcome Guest</div>
        // )


        return this.state.isLoggedIn && <div>Welcome Rozhan</div>
    }
}

export default UserGreeting;
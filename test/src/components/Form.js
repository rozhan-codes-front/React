import React, {Component} from "react";

class Form extends Component {
    state = {
        username : '',
        comment: '',
        select: '',
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleSelectChange = (event) => {
        this.setState({
            select: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(
            [
                this.state.username,
                this.state.comment,
                this.state.select,
            ]
        )
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>username: </label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                </div>

                <div>
                    <label>Comments: </label>
                    <textarea value={this.state.comment} onChange={this.handleCommentChange}/>
                </div>

                <div>
                    <label>Topics: </label>
                    <select value={this.state.select} onChange={this.handleSelectChange}>
                        <option value="React">React</option>
                        <option value="Angular">Angular</option>
                        <option value="Vue">Vue</option>
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Form;
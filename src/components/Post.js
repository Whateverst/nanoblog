import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <h1>{this.props.post}</h1>
        )
    }
}

export default Post
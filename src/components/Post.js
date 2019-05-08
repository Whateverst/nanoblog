import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Post extends Component {
    render() {
        return (
            <Card>
                <Card.Header>{this.props.post}</Card.Header>
                <Card.Body>
                </Card.Body>
            </Card>
        )
    }
}

export default Post
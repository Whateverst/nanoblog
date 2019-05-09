import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Post extends Component {
    render() {
        return (
            <Card>
                <Card.Header>ID: {this.props.post.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.post.title}</Card.Title>
                    <Card.Text>{this.props.post.text}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Post
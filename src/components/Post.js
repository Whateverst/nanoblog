import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Post extends Component {
    render() {
        let ingredients = this.props.post.ingredients.map(function(ingredient) {
            return (
                <ListGroup.Item>
                    Nazwa: {ingredient.name}, Kalorie: {ingredient.calories}, Ilość: {ingredient.amount}
                </ListGroup.Item>
            )
        });
        let comments = this.props.post.comments.map(function(comment) {
            return (
                <ListGroup.Item>
                    {comment.username}: {comment.text}
                </ListGroup.Item>
            )
        })
        return (
            <div>
                <Card bg="info">
                    <Card.Header>ID: {this.props.post.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.post.title}</Card.Title>
                        <Card.Subtitle>Wpis użytkownika: {this.props.post.username}</Card.Subtitle>
                        <Card.Text>{this.props.post.text}</Card.Text>
                        <Card.Subtitle>Składniki</Card.Subtitle>
                    </Card.Body>
                    <ListGroup className="list-group-flush">{ingredients}</ListGroup>
                </Card>
                <Card>
                    <Card.Header>Komentarze</Card.Header>
                    <ListGroup className="list-group-flush">{comments}</ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Dodaj komentarz</Card.Link>
                        <Card.Link href="#">Link</Card.Link>
                    </Card.Body>
                    
                </Card>
            </div>
        )
    }
}

export default Post
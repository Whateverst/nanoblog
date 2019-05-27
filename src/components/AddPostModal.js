import React from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as firebase from "firebase/app";

import "firebase/firestore";

class AddPostModal extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            post: {
                title: '',
                text: '',
                username: '',
                ingredients: [
                    // {name:'test',calories:22,amount:22}
                ],
                comments: [
                    // {username:'test', text:'test'}
                ]
            }
        }
    }

    componentWillMount() {
        let post = this.state.post
        post.username = this.props.username;
        this.setState({post});
    }

    addPost() {
        let db = firebase.firestore();
        let posts = db.collection('posts');
        let post = this.state.post;
        post.username = this.props.username;
        let id = this.makeid(20)
        let postsRef = posts.doc(id); 
        postsRef.set({});
        postsRef.onSnapshot(doc => {
            postsRef.update(post);
        });
        this.forceUpdate();
    }

    makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    handleChange(event) {
        var post = this.state.post;
        post[event.target.id] = event.target.value;
        this.setState({post});
    }

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Dodaj post jako {this.props.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control id="title" type="text" placeholder="Enter title" value={this.state.post.title} onChange={this.handleChange.bind(this)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control id="text" type="text" placeholder="Enter text" value={this.state.post.text} onChange={this.handleChange.bind(this)} />
                    </Form.Group>
                    <Button variant="primary"
                        onClick={()=>{
                            this.addPost()
                        }}
                    >Dodaj</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddPostModal;
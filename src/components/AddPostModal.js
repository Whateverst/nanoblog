import React from "react";

import Modal from "react-bootstrap/Modal";
import * as firebase from "firebase/app";

import "firebase/firestore";

class AddPostModal extends React.Component {
    constructor(...args) {
        super(...args);
    }

    componentWillMount() {
        this.addPost();
    }

    addPost() {
        let db = firebase.firestore();
        let posts = db.collection('posts');
        let post = {
            title: 'test',
            text: 'test',
            username: 'test',
            ingredients: [
                {name:'test',calories:22,amount:22}
            ],
            comments: [
                {username:'test', text:'test'}
            ]
        }
        let id = this.makeid(20)
        let postsRef = posts.doc(id); 
        postsRef.set({});
        postsRef.onSnapshot(doc => {
            postsRef.update(post);
        });
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

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    elo
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddPostModal;
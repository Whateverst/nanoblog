import React from "react";

import Modal from "react-bootstrap/Modal";

class AddPostModal extends React.Component {
    constructor(...args) {
        super(...args);
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
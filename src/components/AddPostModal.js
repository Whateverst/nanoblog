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
      currentIngredient: "",
      currentIngredientAmount: 0,
      currentIngredientInfo: "",
      currentPostTitle: "",
      currentPostText: "",
      /*
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
            */
      currentIngredients: []
    };
  }

  emptyInputValues() {
    this.setState({
      currentIngredient: '',
      currentIngredientAmount: 0,
      currentPostTitle: '',
      currentPostText: '',
      currentIngredients: []
    });
    this.forceUpdate();
  }

  componentWillMount() {
    /*
        let post = this.state.post
        post.username = this.props.username;
        this.setState({post});
        */
  }

  async addPost() {
    // get collection data
    if (
      this.state.currentPostTitle &&
      this.state.currentPostText &&
      this.state.currentIngredients
    ) {
      let db = firebase.firestore();
      let posts = db.collection("posts");
      // create post object
      let post = {
        id: this.makeid(20),
        title: this.state.currentPostTitle,
        text: this.state.currentPostText,
        username: this.props.username,
        ingredients: this.state.currentIngredients,
        comments: [],
        votes: 0
      };
      console.log(post)
      // add post to collection
      let postsRef = posts.doc(post.id);
      postsRef.set({});
      await postsRef.onSnapshot(doc => {
        postsRef.update(post);
        this.emptyInputValues();
      });
    } else alert("Recipe is empty.");
  }

  makeid(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async addIngredient(event) {
    let url =
      "https://api.edamam.com/api/food-database/parser?ingr=" +
      this.state.currentIngredient +
      "&app_id=788aa201&app_key=b9f07b57d0e38195a6ee3a7b9f392347";
    const caloriesRequest = fetch(url)
      .then(response => response.json())
      .then(json => {
        return json.hints[0].food.nutrients.ENERC_KCAL;
      })
      .catch(err => console.log(err));

    let calories = await caloriesRequest;
    if(calories === undefined) {
      calories = 0;
    }
    let ingredient = {
      name: this.state.currentIngredient,
      calories: calories,
      amount: this.state.currentIngredientAmount
    };
    console.log(ingredient);
    this.state.currentIngredients.push(ingredient);
    this.forceUpdate();
  }

  render() {
    let ingredients = this.state.currentIngredients.map(function(
      ingredient,
      index
    ) {
      return (
        <li key={ingredient.name}>
          Name: {ingredient.name} Calories: {ingredient.calories} Amount:{" "}
          {ingredient.amount}
        </li>
      );
    });
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add recipe as {this.props.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name of the dish</Form.Label>
            <Form.Control
              id="currentPostTitle"
              type="text"
              placeholder="Enter title"
              value={this.state.currentPostTitle}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Recipe</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              id="currentPostText"
              type="text"
              placeholder="Enter text"
              value={this.state.currentPostText}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ingredients</Form.Label>
            <ul>{ingredients}</ul>
            <Form.Control
              id="currentIngredient"
              type="text"
              placeholder="Enter name"
              value={this.state.currentIngredient}
              onChange={this.handleChange.bind(this)}
            />
            <Form.Control
              id="currentIngredientAmount"
              type="number"
              placeholder="Enter amount"
              value={this.state.currentIngredientAmount}
              onChange={this.handleChange.bind(this)}
            />
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              onClick={() => {
                this.addIngredient();
              }}
            >
              Add ingredient
            </Button>
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              this.addPost();
              this.props.onHide(true);
            }}
          >
            Add recipe
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddPostModal;

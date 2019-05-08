import React, { Component } from 'react';
import Post from './Post';

class PostBoard extends Component {
    render() {
        const posts = this.props.posts;
        
        var items = posts.map(function(post, index) {
            return <Post post={post} key={index}/>
        })
        return (
            <div>{items}</div>
        );
    }
}

export default PostBoard
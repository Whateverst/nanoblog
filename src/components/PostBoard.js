import React, { Component } from 'react';
import Post from './Post';

class PostBoard extends Component {
    render() {
        const posts = this.props.posts;
        
        if (posts !== []) {
            var items = posts.map(function(post, index) {
                return <Post post={post} key={post.id}/>
            })
            return (
                <div className="post-board">{items}</div>
            );
        }
        
    }
}

export default PostBoard
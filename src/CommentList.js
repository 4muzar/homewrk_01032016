import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import { addComment } from './actions/comments'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array
    };

    state = {
        isOpen: false,
        newComment: ''
    }

    render() {
        const { isOpen } = this.state
        const actionText = isOpen ? 'hide comments' : 'show comments'

        
        return (
            <div>
                <a href = "#" onClick = {this.toggleOpen}>{actionText}</a>
                {isOpen ? this.getCommentsBody() : null}
            </div>
        )
    }

    getCommentsBody() {
        const comments = this.props.comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <ul>{comments}</ul>
                <input type="text" placeholder="Новый комментарий" value={this.state.newComment} onChange={this.handleNewCommentChange}/>
                <input type="button" value="Добавить" onClick={this.addCommentHandler}/>
            </div>
        )
    }

    handleNewCommentChange = (ev) => {
        this.setState({
            newComment: ev.target.value
        });
    }

    toggleOpen = (ev) => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    addCommentHandler = (ev) => {
        addComment(this.state.newComment);
        this.setState({
            newComment: ''
        });
    }
}

export default CommentList
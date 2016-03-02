import SimpleStore from './SimpleStore'
import { ADD_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'

class CommentStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action
            
            switch (type) {
                case ADD_COMMENT:
                    const newCommentId = this.getAll().pop().id + 1;
                    this.add({
                        id: newCommentId,
                        text: data.text
                    })
                    break;

                default: return
            }

            this.emitChange()
        })
    }
}

export default CommentStore
import SimpleStore from './SimpleStore'
import { DELETE_ARTICLE } from '../actions/constants'
import { ADD_COMMENT } from '../actions/constants'
import AppDispatcher from '../dispatcher'
import {commentStore} from './index'

class ArticleStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action
            
            switch (type) {
                case DELETE_ARTICLE:
                    this.delete(data.id)
                    this.emitChange()
                    break;
                case ADD_COMMENT:
                    AppDispatcher.waitFor([commentStore.dispatchToken]);

                    const newComment = commentStore.getAll().pop();
                    const articles = this.getAll();
                    let updatedArticle = articles.find((article) => article.id == action.data.articleId);
                    updatedArticle.comments = updatedArticle.comments || [];
                    updatedArticle.comments.push(newComment.id);
                    
                    this.setAll(articles);
                    this.emitChange();
                    break;
            }
            
        })
    }
}

export default ArticleStore
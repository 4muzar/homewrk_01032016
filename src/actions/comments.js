import AppDispatcher from '../dispatcher'
import { ADD_COMMENT } from './constants'

export function addComment(text) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: { text }
    })
}
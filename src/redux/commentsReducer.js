import { COMMENT_CREATE, COMMENTS_LOAD, COMMENT_UPDATE, COMMENT_DELETE } from './types'

const initialState = {
  comments: [],
  id: 1
}

export const commentsReducer = (state = initialState, action) => {
  console.log('comments Reducer:', action)

  switch (action.type) {
    case COMMENT_CREATE:
      return {
        ...state,
        comments: [...state.comments, action.data]
      }

    case COMMENTS_LOAD:
      const commentsNew = action.data.map((item) => {
        return {
          text: item.name,
          id: item.id
        }
      })
      return {
        ...state,
        comments: commentsNew
      }  

    case COMMENT_UPDATE:
      const { data } = action;
      const { comments } = state;
      const itemIndex = comments.findIndex(item => item.id === data.id)

      const nextComments = [
        ...comments.slice(0, itemIndex),
        data,
        ...comments.slice(itemIndex + 1)
      ];

      return {
        ...state,
        comments: nextComments
      }

      case COMMENT_DELETE:
        return (() => {
          const { id } = action;
          const { comments } = state;
          const itemIndex = comments.findIndex(item => item.id === id)

          const nextComments = [
            ...comments.slice(0, itemIndex),
            ...comments.slice(itemIndex + 1)
          ];

          return {
            ...state,
            comments: nextComments
          }
        })();

    default:
      return state;
  }
}
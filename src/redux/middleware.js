import { COMMENT_CREATE } from './types'

const badWords = ['fuck', 'idiot'];

export function spamFilter(store) {
  return function(next) {
    return function(action) {
      if (action.type === COMMENT_CREATE) {
        console.log('spamFilter:', action.data.text);
        const hasBadWords = badWords.some(word => action.data.text.includes(word));
        if (hasBadWords) {
          return console.log('OSHIBKA EPTA');
        }
      }

      return next(action);
    }
  }
}
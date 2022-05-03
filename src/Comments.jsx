import React from 'react';
import { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import { commentCreate, commentsLoad } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

const Comments = (props) => {
  const [textComment, setTextComment] = useState('');
  const comments = useSelector(state => {
    const { commentsReducer } = state;
    return commentsReducer.comments;
  })

  useEffect(() => {
    dispatch(commentsLoad());
  }, [])

  const dispatch = useDispatch();

  const handleInput = (event) => {
    setTextComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = uniqid();
    dispatch(commentCreate(textComment, id));
  }

  console.log('COMMENTS', comments);

  return (
    <div className='card-comments'>
      <form onSubmit={handleSubmit} className='comments-item-create'>
        <input type='text' value={textComment} onChange={handleInput} />
        <input type='submit' hidden />
      </form>
      {!!comments.length && comments.map(item => {
        return <SingleComment key={item.id} data={item} />
      })}
    </div>
  );
};

export default Comments;
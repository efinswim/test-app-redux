import React from 'react';
import { useState, useEffect } from 'react';
import { commentUpdate, commentDelete } from './redux/actions';
import { useDispatch } from 'react-redux';

const SingleComment = ({ data }) => {
  const [commentText, setCommentText] = useState('');
  const { text, id } = data;
  const dispatch = useDispatch()

  useEffect(() => {
    if (text) {
      setCommentText(text);
    }
  }, [text]);

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(commentUpdate(commentText, id));
  }

  const handleDelete = (event) => {
    event.preventDefault()
    console.log('click');
    dispatch(commentDelete(id));
  }

  const handleInput = (event) => {
    setCommentText(event.target.value);
  }

  return (
    <form 
      className='comments-item'
      onSubmit={handleUpdate}
    >
      <div 
        className='comments-item-delete'
        onClick={handleDelete}
      >
        &times;
      </div>
      <input 
        type='text' 
        value={commentText} 
        onChange={handleInput}
      />
      <input type='submit' hidden />
    </form>
  );
};

export default SingleComment;
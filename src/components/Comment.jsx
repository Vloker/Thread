import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsThread, selectThreadById, postComment } from '../redux/features/User';
import { useDispatch, useSelector } from 'react-redux';

export default function Comment() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const thread = useSelector((state) => selectThreadById(state, id)) || { comments: [] };
  const [newComment, setNewComment] = useState('');
  const [formattedThread, setFormattedThread] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(getDetailsThread(id));
    };

    fetchDetails();
  }, [dispatch, id]);

  useEffect(() => {
    if (thread) {
      const formattedComments = thread.comments.map(comment => {
        const div = document.createElement('div');
        div.innerHTML = comment.content;
        const text = div.textContent || div.innerText || '';
        return {
          ...comment,
          content: text,
        };
      });

      const formattedThreadData = {
        ...thread,
        comments: formattedComments,
      };

      setFormattedThread(formattedThreadData);
    }
  }, [thread]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postComment({ threadId: id, content: newComment }));
      setNewComment('');
      await dispatch(getDetailsThread(id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!formattedThread) {
    return <div className="text-center flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <div className='flex gap-2 items-center'>
        <p className='text-blue-400 text-md'>Comment</p>
        <p className='text-xs'>dibuat oleh <span className='text-blue-600 text-xs'>{formattedThread.owner.name}</span></p>
      </div>

      <div className='border rounded-lg py-2 px-1 mt-1'>
        {formattedThread.comments.map((comment) => (
          <div key={comment.id} className="p-2 flex flex-col items-start">
            <div className="flex items-center">
              {comment.owner.avatar && (
                <img
                  src={comment.owner.avatar}
                  alt="User Avatar"
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span className="ml-2 text-sm">{comment.owner.name}</span>
            </div>
            <div className="mt-1 text-sm">
              {comment.content.split('\n').map((line, idx) => (
                <p key={idx} className="mb-2">{line}</p>
              ))}
            </div>
            <p className="text-xs text-gray-500">{comment.createdAt}</p>
          </div>
        ))}

        <form className='flex items-center gap-2 mt-2' onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={handleInputChange}
            id="chat"
            rows="1"
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
}

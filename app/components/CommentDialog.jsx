'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CommentDialog = ({ props }) => {
  const [loadComments, setLoadComments] = useState([]);
  const [content, setContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyDialogFor, setReplyDialogFor] = useState(null);
  const [viewRepliesFor, setViewRepliesFor] = useState({});

  const { blogId } = props;

  useEffect( () => {
    const fetchComments = async () => {
      const res= await axios.get(`/api/comment/get/${blogId}`);
      if (res.status !== 200) {
        alert("Failed to load comments");
        return;
        }
      const data = res.data;
      if (data) {
        setLoadComments(data.comments);
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!content) {
      alert("Comment content cannot be empty");
      return;
    }
    try {
     const res= await axios.post(`/api/comment`, { content, blogId });

      if (res.status === 201) {
        setLoadComments([...loadComments, res.data.comment]);
        setContent('');
      } else {
        alert("Failed to add comment");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    }
  };

  const handleReplyComment = async (commentId) => {
    if (!replyContent) {
      alert("Reply content cannot be empty");
      return;
    }

    try {
      const res = await axios.post(`/api/comment/${commentId}`, {
        content: replyContent,
        blogId,
         parentComment: commentId
      });
      if (res.status === 201) {
        const updatedComments = loadComments.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), res.data.comment],
            };
          }
          return comment;
        });
        setLoadComments(updatedComments);
        setReplyContent('');
        setReplyDialogFor(null);
      } else {
        alert("Failed to add reply");
      }
    } catch (err) {
      console.error(err);
      alert("Error replying to comment");
    }
  };

  const toggleReplies = (commentId) => {
    setViewRepliesFor(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      {/* Add Comment */}
      <div className='mb-4 flex gap-2'>
        <input
          type="text"
          placeholder='Add comment'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border p-2 rounded w-full'
        />
        <button className='bg-red-300 px-3 py-2 rounded' onClick={handleAddComment}>
          Add Comment
        </button>
      </div>

      {/* Render Comments */}
      {loadComments.length > 0 && loadComments.map((comment) => (
        <div key={comment._id} className='bg-gray-100 p-3 rounded my-3'>
          <p className='font-semibold'>{comment.userName}</p>
          <p>{comment.content}</p>
          <p className='text-xs text-gray-500'>{new Date(comment.createdAt).toLocaleDateString()}</p>

          <div className='flex gap-3 mt-2'>
            <button className='text-blue-500' onClick={() => toggleReplies(comment._id)}>
              {viewRepliesFor[comment._id] ? 'Hide Replies' : 'View Replies'}
            </button>
            <button className='text-green-500' onClick={() => setReplyDialogFor(comment._id)}>
              Reply
            </button>
          </div>

          {/* Reply Input */}
          {replyDialogFor === comment._id && (
            <div className='mt-2'>
              <input
                type="text"
                placeholder='Reply to comment'
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className='border p-2 rounded w-full'
              />
              <button
                className='bg-blue-300 px-2 py-1 rounded mt-1'
                onClick={() => handleReplyComment(comment._id)}
              >
                Reply
              </button>
            </div>
          )}

          {/* Replies Section */}
          {viewRepliesFor[comment._id] && comment.replies?.length > 0 && (
            <div className='mt-2 ml-4'>
              {comment.replies.map(reply => (
                <div key={reply._id} className='bg-gray-200 p-2 rounded my-2'>
                  <p className='font-semibold'>{reply.userName}</p>
                  <p>{reply.content}</p>
                  <p className='text-xs text-gray-500'>{new Date(reply.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentDialog;

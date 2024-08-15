import React, { useState } from 'react';
import { getCookie } from 'cookies-next';

function CommentSection(props) {
  const { setComments, comments } = props; // Destructure props

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting comment: ${response.statusText}`);
      }

      // Assuming the response is a JSON object and the server returns the deleted comment or a success message
      const data = await response.json();

      // Update comments state
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <div className="mt-12 font-poppins">
        <h3 className="text-lg font-semibold text-gray-800">
          All Comments ({comments.length})
        </h3>
        <div className="space-y-6 mt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 shadow-md border p-6 rounded-lg">
              <div className="flex items-start">
                <img
                  src={
                    comment.user.img == null
                      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}`
                      : `http://localhost:8000/uploads/${comment.user.img}`
                  }
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{comment.user.name}</h4>
                      <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                    </div>
                    <div className="flex space-x-2">
                      {comment.user.id === JSON.parse(getCookie('user')).id && (
                        <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;

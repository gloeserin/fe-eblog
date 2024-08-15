import React from 'react'
import { getCookie } from "cookies-next";

function CommentSection(props) {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }


  const handleDeleteComment = async (commentId) => {
    await fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getCookie("token")}` },
    })
    .then((response) => response.json())
    .then(() => {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    })
    .catch((error) => console.error("Error deleting comment:", error));
}


  return (
    <div>
      <div className="mt-12 font-poppins">
        <h3 className="text-lg font-semibold text-gray-800">All Comments ({props.comments.length})</h3>
        <div className="space-y-6 mt-6">
          {/* Comment 1 */}
          {
            props.comments.map((comment) => (
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
                        {comment.user.id === JSON.parse(getCookie("user")).id && (
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500">Delete</button>
                        )  
                        }              
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                      {comment.content}
                    </p>
                    {/* Reply to Comment */}

                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CommentSection

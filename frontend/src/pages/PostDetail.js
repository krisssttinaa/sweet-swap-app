import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail({ match }) {
  const [post, setPost] = useState(null);
  const postId = match.params.id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://88.200.63.148:8288/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      <h2>Post Detail</h2>
      {post && (
        <div>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
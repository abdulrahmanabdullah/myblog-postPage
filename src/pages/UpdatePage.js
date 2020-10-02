import React from 'react';

// get post by id with get methods.
async function getPostByID(id) {
  try {
    const res = await fetch(
      `https://abdulrahmanblog.herokuapp.com/blogs/${id}`,
      {
        method: 'GET',
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('failed to get post', error);
  }
}

// update post by id with put method's
async function updatePost(id) {}
export default function UpdatePage() {
  function updatePost(id) {
    console.log(id);
    // get blog by id
    getPostByID(id).then((post) => console.log(post));
  }

  // Hooks
  const [postId, setPostId] = React.useState('');
  return (
    <div>
      <input
        type='text'
        placeholder='please enter post id'
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <button onClick={() => updatePost(postId)}> update </button>
    </div>
  );
}

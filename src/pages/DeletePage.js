import React from 'react';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-top: 50px;
  width: 90%;
  border: 1px solid black;
`;

async function deleteBlogAPI(id) {
  try {
    const res = await fetch(
      `https://abdulrahmanblog.herokuapp.com/blogs/${id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.error(' some error ocurred  when delete blog', error);
  }
}
export default function DeletePage() {
  // handle input value, here is blog id .
  const [inpValue, setInpValue] = React.useState('');

  function handleDeleteBlog(id) {
    // call end api to delete blog with id.
    console.log(id);
    deleteBlogAPI(id)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  return (
    <CONTAINER>
      <div>
        <input
          type='text'
          placeholder='blog id'
          onChange={(e) => setInpValue(e.target.value)}
          value={inpValue}
        />
        <button onClick={() => handleDeleteBlog(inpValue)}>
          {' '}
          delete blog{' '}
        </button>
      </div>
    </CONTAINER>
  );
}

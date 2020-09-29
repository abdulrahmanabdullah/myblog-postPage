import React from 'react';
import styled from 'styled-components';
// Style of ul that render in post component
const LIST = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;
// Component to render list of posts .
export default function Posts({ store }) {
  return (
    <LIST>
      {store &&
        store.map((post) => (
          <li key={post._id}>
            {post.title} , {post._id}
          </li>
        ))}
    </LIST>
  );
}

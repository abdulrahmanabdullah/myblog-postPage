import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../hooks';
import Posts from '../components/Posts';

const CONTAINER = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 90%;
  border: 1px solid black;
`;

const BUTTON = styled.button`
  width: 100px;
  height: 100px;
  color: white;
  background-color: gray;
  margin: 5px;
`;
export default function Home() {
  const store = usePost();
  return (
    <>
      <CONTAINER>
        <Link to='/'>
          <BUTTON>HOME</BUTTON>
        </Link>
        <Link to='/add'>
          <BUTTON>Add</BUTTON>
        </Link>
        <Link to='/update'>
          <BUTTON>Update</BUTTON>
        </Link>
        <Link to='/delete'>
          <BUTTON>Delete</BUTTON>
        </Link>
      </CONTAINER>
      <Posts store={store} />
    </>
  );
}

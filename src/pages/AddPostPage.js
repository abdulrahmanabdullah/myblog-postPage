import React from 'react';
import RichEditor from './RichEditor';

function getDataFromLS() {
  const title = localStorage.getItem('post_title');
  const content = localStorage.getItem('post');

  if (title) return title;

  return '';
}

export default function AddPostPage() {
  const title = getDataFromLS();
  return (
    <div>
      {' '}
      <RichEditor title={title} />{' '}
    </div>
  );
}

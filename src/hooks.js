import React from 'react';
export function usePost() {
  // Post state.
  const [store, setStore] = React.useState([]);
  // Get all posts from DBass, get it once and just first render of this component.
  React.useEffect(() => {
    (async () => {
      const res = await fetch('https://abdulrahmanblog.herokuapp.com/blogs');
      // debugger;
      const data = await res.json();
      setStore(data);
    })();
  }, []);
  return store;
}

import React, { useState, useEffect } from 'react';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import Home from './pages/Home';
import UpdatePage from './pages/UpdatePage';
import RichEditor from './pages/RichEditor';
import DeletePage from './pages/DeletePage';
import AddPostPage from './pages/AddPostPage';

export default function App() {
  const [direction, setDirection] = useState('ar');
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const theme = createMuiTheme({
    direction: 'ltr',
  });
  document.body.dir = direction === 'en' ? 'ltr' : 'rtl';

  return (
    <div style={{ width: '100%' }}>
      <BrowserRouter>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            {/* Back to home page to show all blogs id  */}
            <Home />
            <Route
              path='/add'
              component={AddPostPage}
              // render={(props) => (
              //   <RichEditor
              //     {...props}
              //     title2='title'
              //     imageCover2='imageCover'
              //     content='content'
              //   />
              // )}
            />
            <Route path='/update' component={UpdatePage} />
            <Route path='/delete' component={DeletePage} />
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </div>
  );
}

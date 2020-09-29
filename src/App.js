import React, { useState, useEffect } from 'react';
import RichEditor from './components/editor/RichEditor';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import Home from './pages/Home';
import UpdatePage from './pages/UpdatePage';
import DeletePage from './pages/DeletePage';

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
            <Route path='/add' component={RichEditor} />
            <Route path='/update' component={UpdatePage} />
            <Route path='/delete' component={DeletePage} />
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </div>
  );
}

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import Html from './Html';
import App from '../shared/App';

const serverRenderer = () => (req, res) => {
  const context = {};

  const content = renderToString(
    <Provider store={req.store}>
      <Router location={req.url} context={context}>
        <App />
      </Router>
    </Provider>,
  );

  const state = JSON.stringify(req.store.getState());

  const template = renderToString(
    <Html
      css={[res.locals.assetPath('main.css')]}
      scripts={[res.locals.assetPath('main.js')]}
      state={state}
    >
      {content}
    </Html>,
  );

  return res.send(`<!doctype html>${template}`);
};

export default serverRenderer;

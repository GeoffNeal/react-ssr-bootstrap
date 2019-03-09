import React from 'react';
import { renderToString } from 'react-dom/server';

// Components
import Html from './Html';
import App from '../shared/App';

const serverRenderer = () => (req, res) => {
  const content = renderToString(<App />);
  const template = renderToString(
    <Html
      css={[res.locals.assetPath('main.css')]}
      scripts={[res.locals.assetPath('main.js')]}
    >
      {content}
    </Html>,
  );

  return res.send(`<!doctype html>${template}`);
};

export default serverRenderer;

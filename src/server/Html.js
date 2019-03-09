import React from 'react';
import { string, node, arrayOf } from 'prop-types';

const Html = props => {
  const { children, scripts, css } = props;
  return (
    <html lang="en">
      <head>
        <title>Space Place</title>
        {css.map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  children: node.isRequired,
  css: arrayOf(string).isRequired,
  scripts: arrayOf(string).isRequired,
};

export default Html;

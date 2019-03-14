// @flow
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import Helmet from 'react-helmet';

type PropsT = {
  children: any,
  css: string[],
  scripts: string[],
  state: string,
};

const Html = (props: PropsT) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  const { children, scripts, css, state } = props;
  return (
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {css.map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />
      </head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
};

export default Html;

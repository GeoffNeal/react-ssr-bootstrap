import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';

// Middleware
import manifestMiddleware from 'ExpressMiddleware/manifest-middleware';
import serverRenderMiddleware from 'ExpressMiddleware/render-middleware';

// Other
import paths from 'Config/paths';
import { configureStore } from 'Shared/store';
import createHistory from 'Shared/store/history';

const app = express();

app.use(
  paths.publicPath,
  express.static(path.join(paths.clientBuild, paths.publicPath)),
);

app.use('/favicon.ico', (req, res) => {
  res.send('');
});

app.use(cors());

app.use(bodyParser.json());

const addStore = (req, res, next) => {
  const history = createHistory({ initialEntries: [req.url] });
  res.locals.store = configureStore({ history });
  if (typeof next !== 'function') {
    throw new Error('Next handler is missing');
  }
  next();
};

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
  manifestMiddleware({
    manifestPath: `${manifestPath}/manifest.json`,
  }),
);

app.use(serverRenderMiddleware());

app.listen(process.env.PORT || 8500, () => {
  // eslint-disable-next-line no-console
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(
      `App is running: 🌎 ${process.env.HOST || 'http://localhost'}:${process
        .env.PORT || 8500}`,
    ),
  );
});

export default app;

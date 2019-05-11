const webpack = require('webpack');

const webpackConfig = require('../config/webpack')(process.env.NODE_ENV || 'production');
const paths = require('../config/paths');
const { logMessage, compilerPromise, sleep } = require('./utils');

const { choosePort } = require('react-dev-utils-for-webpack4/WebpackDevServerUtils');

const HOST = process.env.HOST || 'http://localhost';

const generateStaticHtml = async () => {
  const nodemon = require('nodemon');
  const fs = require('fs');
  const puppeteer = require('puppeteer');
  const PORT = await choosePort('localhost', 8505);

  process.env.PORT = PORT;

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['*'],
  });

  script.on('start', async () => {
    try {
      // TODO: add try/wait/retry here instead of just generally waiting for 2000 ms
      await sleep(2000);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`${HOST}:${PORT}`);
      const pageContent = await page.content();
      fs.writeFileSync(`${paths.clientBuild}/index.js`, pageContent);
      await browser.close();
      script.emit('quit');
    } catch (e) {
      script.emit('quit');
      console.log(e);
    }
  });

  script.on('exit', code => {
    process.exit(code);
  });

  script.on('crash', () => {
    process.exit(1);
  });
};

const build = async () => {
  // fs.unlink(paths.clientBuild, () => console.log('Unlinked client build'));
  // fs.unlink(paths.serverBuild, () => console.log('Unlinked server build'));
  // fs.unlinkSync(paths.clientBuild);
  // fs.unlinkSync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    await generateStaticHtml();
    logMessage('Done!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();

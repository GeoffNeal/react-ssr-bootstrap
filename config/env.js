const fs = require('fs');
const path = require('path');
const paths = require('./paths');

delete require.cache[require.resolve('./paths')];

if (!process.env.NODE_ENV) {
  throw new Error(
    'The process.env.NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${process.env.NODE_ENV}.local`,
  `${paths.dotenv}.${process.env.NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  process.env.NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set. Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

module.exports = () => {
  // define env vars you want to use in your client app here.
  // CAREFUL: don't use any secrets like api keys or database passwords as they are exposed publicly!
  const raw = {
    PORT: process.env.PORT || 8500,
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'http://localhost',
  };

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
};

import fs from 'fs';

let manifest;
const options = {};

const loadManifest = () => {
  if (manifest && options.cache) return manifest;

  try {
    return JSON.parse(fs.readFileSync(options.manifestPath, 'utf8'));
  } catch (err) {
    throw new Error('Asset Manifest could not be loaded.');
  }
};

export const lookup = source => {
  manifest = loadManifest();
  if (manifest[source]) return options.prependPath + manifest[source];
  return '';
};

export const assetPath = source => {
  return lookup(source);
};

export default opts => {
  const defaults = {
    cache: true,
    prependPath: '',
  };

  manifest = null;
  Object.assign(options, defaults, opts);

  return (req, res, next) => {
    res.locals.assetPath = assetPath;
    next();
  };
};

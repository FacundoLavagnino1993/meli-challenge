const env = process.env;

const config = {
  'api': {
    'basePath': 'https://api.mercadolibre.com'
  }
}

module.exports = {
  port: env.PORT || 3001,
  host: env.HOST || 'localhost',
  envConfig: config,
  isBrowser: typeof window !== 'undefined',
};

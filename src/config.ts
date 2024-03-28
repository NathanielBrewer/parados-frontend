const environment = process.env.NODE_ENV ?? 'development';

interface Config {
  backendBaseUrl: string,
}

const devConfig: Config = {
  backendBaseUrl: 'http://localhost:3000',
}

const prodConfig: Config = {
  backendBaseUrl: 'https://vast-cove-24733-f2209d5e3910.herokuapp.com/',
}

const config = (environment === 'development')? devConfig : prodConfig;

export default config;
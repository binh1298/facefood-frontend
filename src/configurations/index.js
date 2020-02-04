const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',

  APP_ROOT_PORT: process.env.APP_ROOT_PORT,
  APP_ROOT_URL: process.env.APP_ROOT_URL
};

export const {
  NODE_ENV,

  APP_ROOT_PORT,
  APP_ROOT_URL
} = publicRuntimeConfig;

export default publicRuntimeConfig.NODE_ENV === 'production';

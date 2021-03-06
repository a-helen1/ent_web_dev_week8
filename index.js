'use strict';

const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const utils = require('./app/api/utils')

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 3000,
  routes: {cors:true}
});

require('./app/models/db');

async function init() {
  await server.register(require('@hapi/inert'));
  await server.register(require('@hapi/vision'));
  await server.register(require('@hapi/cookie'));
  await server.register(require('hapi-auth-jwt2'));

  server.validator(require('@hapi/joi'))

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    },
    redirectTo: '/'
  });

  server.auth.strategy('jwt', 'jwt', {
    key: 'secretpasswordnotrevealedtoanyone',
    validate: utils.validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('session');

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false
  });

  server.route(require('./routes'));
  server.route(require('./routes-api'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

import config from './config.json';

let request = require('request');

var options = {
  uri: `http://${config.server.host}:${config.server.port}`,
  method: 'POST',
  json: {
    "message": `TEST TEST ${new Date().getTime()}`
  }
};

request(options, function (error, response, body) {
});
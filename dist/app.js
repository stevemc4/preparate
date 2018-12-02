'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const app = new _hapi2.default.Server({
    port: process.env.PORT
});

/**
 * Starts the server
 */
async function provision() {
    console.log('Starting Server...');
    console.log('Registering router...');
    app.route(_index2.default.initialize());
    await app.start();
    console.log('Server Started!');
    console.log(`Listening on port ${process.env.PORT}`);
}

provision();
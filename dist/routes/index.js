'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {hapi.ServerRoute[]}
 */
let routes = [{
    path: '/',
    method: 'GET',
    handler: (req, h) => 'Hello World'
}];

/**
 * Initialize router
 * @returns {hapi.ServerRoute[]} Hapi routes
 */
function initialize() {
    return routes;
}

exports.default = { initialize };
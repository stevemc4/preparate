import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

/**
 * @type {hapi.ServerRoute[]}
 */
let routes = [
    {
        path: '/',
        method: 'GET',
        handler: (req, h) => {
            return h.view('index')
        }
    },
]

/**
 * Initialize router
 * @returns {hapi.ServerRoute[]} Hapi routes
 */
function initialize()
{
    return routes
}

export default {initialize}
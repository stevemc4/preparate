import hapi from 'hapi'
import dotenv from 'dotenv'
import vision from 'vision'
import router from './routes/index'
import ejs from 'ejs'
import postcss from 'postcss'
import fs from 'fs'
import tailwindcss from 'tailwindcss'
import nuxt from 'hapi-nuxt'

const rawTailwindCssFileContent = fs.readFileSync(process.cwd() + '/tailwind.css').toString()

dotenv.config()

const app = new hapi.Server({
    port: process.env.PORT
})

async function compileCss()
{
    let css = await postcss([tailwindcss(process.cwd() + '/tailwind.js')])
        .process(rawTailwindCssFileContent, {
            from: 'tailwind.css',
            to: 'static/styles/main.css'
        })

    return css.css
}

/**
 * Starts the server
 */
async function provision () {
    console.log('Building CSS...')
    let css = await compileCss()

    console.log('Starting Server...')
    console.log('Registering router...')

    //app.route(router.initialize())
    app.route({
        path: '/static/styles/main.css',
        method: 'GET',
        handler: (req, h) => {
            return h.response(css).type('text/css')
        }
    })

    console.log('Registering plugins...')
    await app.register(vision)
    await app.register({
        plugin: nuxt,
        options: {
            srcDir: process.cwd(),
            head: {
                link: [
                    {
                        rel: 'stylesheet',
                        href: '/static/styles/main.css'
                    }
                ]
            }
        }
    })
    app.views({
        engines: ({ejs}),
        path: process.cwd() + '/views'
    })


    await app.start()
    
    console.log('Server Started!')
    console.log(`Listening on port ${process.env.PORT}`)
}

provision()
import express from 'express'
import { config } from './config/config'
import Logging from './library/Logging'
import routes from './routes'
import connect from './utils/connect'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    //** Log the request */
    Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
        /** Log the response */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
    })

    next()
})

/** Rules of my API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next()
})

/** Error handling */
// app.use((req, res, next) => {
//     const error = new Error('Not found')

//     Logging.error(error)

//     res.status(404).json({
//         message: error.message,
//     })
// })

app.listen(config.server.port, async () => {
    Logging.info(`Server is running on port ${config.server.port}`)

    await connect()

    routes(app)

})

import mongoose from 'mongoose'
import { config } from '../config/config'
import Logging from '../library/Logging'

/** connect to Mongo */
async function connect() {
    try {
        await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
        Logging.info('connected to mongoDB')
    } catch (error) {
        Logging.error('unable to connect')
        Logging.error(error)
    }
}

export default connect

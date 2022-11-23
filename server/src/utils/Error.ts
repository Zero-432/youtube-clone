import { Response } from 'express'

function Error(err: any, res: Response) {
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    return res.status(status).json({
        success: false,
        status,
        message,
    })
}

export default Error

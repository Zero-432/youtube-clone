"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Error(err, res) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
}
exports.default = Error;

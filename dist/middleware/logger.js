"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
var loggerMiddleware = function (req, res, next) {
    var _a = req.query, filename = _a.filename, height = _a.height, width = _a.width;
    console.log('Image data', filename, height, width);
    next();
};
exports.loggerMiddleware = loggerMiddleware;

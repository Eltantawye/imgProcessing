"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleware = void 0;
var validatorMiddleware = function (req, res, next) {
    var _a = req.query, filename = _a.filename, height = _a.height, width = _a.width;
    if (!filename || !parseInt(width) || !parseInt(height)) {
        res
            .status(404)
            .send('Image is not found please provide valid url ex: http://localhost:3000/image?filename=fjord&width=350&height=350');
    }
    else {
        next();
    }
};
exports.validatorMiddleware = validatorMiddleware;

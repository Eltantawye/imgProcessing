"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = require("./middleware/logger");
var validator_1 = require("./middleware/validator");
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
app.use('/image', [logger_1.loggerMiddleware, validator_1.validatorMiddleware], index_1.default);
app.listen(port, function () {
    console.log('Server is up running ', port);
});
exports.default = app;

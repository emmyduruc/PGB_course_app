"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const method = req.method;
    console.log(`Client just made a ${method} request`);
    next();
};
exports.default = logger;
//# sourceMappingURL=loggers.js.map
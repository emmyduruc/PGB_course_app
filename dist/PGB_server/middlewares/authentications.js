"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication = (req, res, next) => {
    const headers = req.headers;
    const isLoggedIn = headers.is_logged_in;
    if (isLoggedIn) {
        next();
    }
    else {
        res.status(401).send(`Please Login`);
    }
};
exports.default = authentication;
//# sourceMappingURL=authentications.js.map
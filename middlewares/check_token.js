const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    let token = req.get('Authorization') || req.query.token;

    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
            };
            req.user = err ? null : decoded;
            return next();
        });
    } else {
        req.user = null;
        next();
    };
};

module.exports = checkToken;
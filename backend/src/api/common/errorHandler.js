const _ = require('lodash')

var parseErrors = function (restfulErrors) {
    const err = []
    _.forIn(restfulErrors, error => err.push(error.message))
    return err
}

module.exports = function (req, res, next) {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}
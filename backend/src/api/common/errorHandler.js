const _ = require('lodash')

const parseErrors = restfulErrors => {
    const err = []
    _.forIn(restfulErrors, error => err.push(error.message))
    return err
}

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}
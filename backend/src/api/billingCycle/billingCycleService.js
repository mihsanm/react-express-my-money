const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle
    .methods(['get', 'post', 'put', 'delete'])
    .updateOptions({ new: true, runValidators: true })
    .after('post', errorHandler)
    .after('put', errorHandler)
    .after('get', errorHandler)
    .after('delete', errorHandler)

BillingCycle.route('count', function (req, res, next) {
    BillingCycle.count(function (error, value) {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

BillingCycle.route('summary', function (req, res, next) {
    BillingCycle.aggregate(
        { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
        { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
        { $project: { _id: 0, credit: 1, debt: 1 } }
        , function (error, result) {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        })
})

module.exports = BillingCycle
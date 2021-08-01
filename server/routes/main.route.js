const router = require('express').Router()

router.get('/', function (req, res) {
    res.send('Krypto API')
})

module.exports = router

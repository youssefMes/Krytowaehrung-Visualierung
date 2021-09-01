const router = require('express').Router()
const cryptoController = require('../controllers/main.controller')

router.route('/asset/get-one')
    .get(cryptoController.getOne);

module.exports = router

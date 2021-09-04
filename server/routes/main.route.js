const router = require('express').Router()
const cryptoController = require('../controllers/main.controller')

router.route('/asset/ohlc')
    .get(cryptoController.getAssetOHLC);
router.route('/asset/info')
    .get(cryptoController.getAssetsPrice);

module.exports = router

const router = require('express').Router()
const cryptoController = require('../controllers/main.controller')

router.route('/asset/ohlc')
    .get(cryptoController.getAssetOHLC);
router.route('/asset/price')
    .get(cryptoController.getAssetsPrice);
router.route('/asset/price/line')
    .get(cryptoController.getLineChartData);

module.exports = router

const restClient = require('../client/client.factory').getRestClient()
const streamClient = require('../client/client.factory').getStreamClient()
const https = require('https');
const axios = require("axios");

const getAssetOHLC = async function (req, res) {
    const {pairSymbol} = req.query
    const response = await restClient.getOHLC('kraken', pairSymbol)
    res.send(response)
}

const getAssetsPrice = async function (req, res) {
    try {
        axios.get('https://rest.coinapi.io/v1/assets?filter_asset_id=ETH,XRP,ADA,BTC,DOGE,BNB,MATIC', {
            headers: {
                'X-CoinAPI-Key': '8FB737A3-F629-417C-91A4-5C2AB0AB2CF2'
            },

        }).then(response => {
            const prices = response.data.map(coin =>  {
                return {
                    asset_id: coin.asset_id,
                    name: coin.name,
                    price_usd: coin.price_usd
                }
            })
            res.send(prices)
        })

    } catch (err) {
        res.send(err)
    }

}

module.exports = {
    getAssetOHLC,
    getAssetsPrice
};

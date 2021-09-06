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
        axios.get('https://rest.coinapi.io/v1/assets?filter_asset_id=ETH,XRP,ADA,BTC', {
            headers: {
                'X-CoinAPI-Key': '3A09C042-28CB-4640-B89D-1154F310500D'
            },
            
        }).then(response => {
            res.send(response.data)
        })

    } catch (err) {
        res.send(err)
    }

}

module.exports = {
    getAssetOHLC,
    getAssetsPrice
};

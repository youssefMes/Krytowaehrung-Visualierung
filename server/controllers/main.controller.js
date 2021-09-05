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
        axios.get('https://rest.coinapi.io/v1/assets', {
            headers: {
                'X-CoinAPI-Key': '8FB737A3-F629-417C-91A4-5C2AB0AB2CF2'
            }
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

const restClient = require('../client/client.factory').getRestClient()
const streamClient = require('../client/client.factory').getStreamClient()


const getAssetOHLC = async function (req, res) {
    const {pairSymbol} = req.query
    const response = await restClient.getOHLC('kraken', pairSymbol)
    res.send(response)
}

const getAssetsPrice = function (req, res) {
    const {pairs} = req.query
    let assets = []
    if (pairs.length > 0) {
        try {
            pairs.map(async (pairSymbol) => {
                assets.push(await restClient.getPrice('kraken', pairSymbol))
            })
            res.send(assets)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = {
    getAssetOHLC,
    getAssetsPrice
};

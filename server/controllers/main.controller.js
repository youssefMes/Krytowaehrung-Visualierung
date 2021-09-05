const restClient = require('../client/client.factory').getRestClient()
const streamClient = require('../client/client.factory').getStreamClient()


const getAssetOHLC = async function (req, res) {
    const {pairSymbol} = req.query
    const response = await restClient.getOHLC('kraken', pairSymbol)
    res.send(response)
}

const getAssetsPrice = async function (req, res) {
    const {pairs} = req.query
    let assets = []
    if (pairs.length > 0) {
        try {
            pairs.map(async (pairSymbol) => {
                assets.push(await restClient.getPrice('kraken', pairSymbol))
                console.log(assets)
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

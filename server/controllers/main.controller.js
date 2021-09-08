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
                'X-CoinAPI-Key': '15442BF3-0AD0-435F-AB8F-163D8DB0B4C6'
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


const getLineChartData = async function (req, res) {
    try {
        const {id, timeFilter} = req.query
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeFilter}`)
        const prices = response.data.prices.map(el => {
            const date = new Date(el[0]);
            const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            const year = date.getFullYear();
            const month = months[date.getMonth()];
            const day = date.getDate();
            return {
                date: day + '-' + month + '-' + year,
                price: el[1],
            }
        })
        res.send(prices)
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    getAssetOHLC,
    getAssetsPrice,
    getLineChartData
};

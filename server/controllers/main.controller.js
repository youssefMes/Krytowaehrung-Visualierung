const {StreamClient} = require("cw-sdk-node");


const getOne = async function (req, res) {
    const {asset} = req.query
    const client = new StreamClient({
        creds: {
            apiKey: "WBES4COG9QL09T2KXOY3", // your cw api key
            secretKey: "" // your cw secret key
        },
        subscriptions: [
            "markets:87:trades", // kraken btc:usd
            "pairs:9:performance", // btc/usd pair
            "markets:1:trades"
        ],
        logLevel: "debug"
    });
    res.send([])
}


module.exports = {
    getOne
};

const {StreamClient, RESTClient} = require("cw-sdk-node");


const getRestClient = () => {
    return  new RESTClient({
        creds: {
            apiKey: "E52WHWVO64F3ZCHM286I",
            secretKey: "00N9ORcxolifbE759QHBgKncshZA7Yl3lFnfNYAW"
        },
        subscriptions: [
            "markets:87:trades", // kraken btc:usd
            "pairs:9:performance", // btc/usd pair
            "markets:1:trades"
        ],
        logLevel: "debug"
    });
}

const getStreamClient = () => {
    return  new StreamClient({
        creds: {
            apiKey: "WBES4COG9QL09T2KXOY3",
            secretKey: "00N9ORcxolifbE759QHBgKncshZA7Yl3lFnfNYA"
        },
        subscriptions: [
            "markets:87:trades", // kraken btc:usd
            "pairs:9:performance", // btc/usd pair
            "markets:1:trades"
        ],
        logLevel: "debug"
    });
}

module.exports = {
    getRestClient,
    getStreamClient
};

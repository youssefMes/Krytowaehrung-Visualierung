const express = require('express')
const cors = require('cors')
const routes = require('./routes/main.route')
const app = express()
app.use(cors())

const port = process.env.PORT || 9000

app.use('/api', routes)
let interval;

const getApiAndEmit = socket => {
    // const client = new RESTClient({
    //     creds: {
    //         apiKey: "WBES4COG9QL09T2KXOY3" // your cw api key
    //     }
    // });


// All requests return promises that return the formatted API data.
//     client.getOHLC('binance', 'btcusdt', {after: '1262365406', before: '1629479006'}).then((response) =>{
//         let exchanges = response.result;
//         console.log(response)
//         socket.emit("FromAPI", response);
//     });
    // Emitting a new message. Will be consumed by the client
};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//server.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express')
const routes = require('./routes/main.route')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
const port = process.env.PORT || 9000

app.use('/api', routes)


let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
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


server.listen(port, () => console.log(`Listening on port ${port}`));

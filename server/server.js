// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 5000 });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(data) {
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(data);
//             }
//         });
//     });
// });
// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807



// 'get websocket out of the package' - video guy
const WebSocket = require('ws')

//we also need to be able to serve the static files in the client folder
const express = require('express')
const app = express()
// const path = require('path')

// idk about this!! how to serve static files?
// app.use('/', express.static(path.resolve(__dirname, '../public')))
app.use(express.static('build'));

//heroku would be PORT ENV ?
const server = app.listen(5000)

const wss = new WebSocket.Server({
    noServer: true,
})

let ivoryScore = 0;
let brownScore = 0;

let rooms = [];

function addOne(color){
    console.log('made it here to addOne in server');
    if (color === 'ivory'){
        ivoryScore = ivoryScore + 1;
    } else if ( color === 'brown'){
        brownScore = brownScore + 1
    }
}

// // app.get('/', function (req, res, next) {
// //     console.log('hey, inside get in server.js');
    
// // });

// app.get('/', (req, res) => {
//     console.log('in basic GET' );
//     res.send({test: "hi"});
// })

wss.on('connection', function (ws) {
    console.log('websocket connected');
    ws.on('message', function (data) {
        console.log('data being sent to server: ', data);
        const { color, type, value } = JSON.parse(data);
        if (type === 'increase-score-by-1'){
            addOne(color);
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'score-update', ivoryScore, brownScore }));
                }
            })
        }
        //default
        rooms.push(JSON.parse(data).roomName);
        console.log('rooms: ', rooms);
        

        // wss.clients.forEach(function each(client) {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {                
        //         client.send(JSON.stringify({ type: 'score-update', ivoryScore, brownScore}));
        //     }
        // })
    })
})


server.on('upgrade', async function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request)
    })
})
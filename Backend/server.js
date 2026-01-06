import dotenv from 'dotenv'
dotenv.config({
    path : './.env'
})
import connectDB from './db/connectDB.js'

import {app} from './app.js';
import http from 'node:http'
import {initializeSocket} from './socket.js'

const port = process.env.PORT || 3000
const server = http.createServer(app)
initializeSocket(server)

connectDB()
.then(() => {
    server.listen(port , () => {
        console.log(`server is listening on port number ${port}`)
    })
})
.catch((error) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
})

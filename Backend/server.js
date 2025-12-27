import dotenv from 'dotenv'
dotenv.config({
    path : './.env'
})

import {app} from './app.js';
import http from 'node:http'

const port = process.env.PORT || 3000

console.log(port)

const server = http.createServer(app)


server.listen(port , () => {
    console.log(`server is listening on port number ${port}`)
})

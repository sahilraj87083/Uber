import express, { urlencoded } from 'express'
import cors from 'cors'
import { LIMIT } from './constants.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.routes.js'

const app = express();
app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))

app.use(express.json({limit : LIMIT}))
app.use(cookieParser())
app.use(urlencoded({
    extended : true,
    limit : LIMIT
}))
app.use(express.static('public'))

// app.use((req, res, next) => {
//   console.log("Content-Type:", req.headers["content-type"]);
//   console.log("Body at middleware:", req.body);
//   next();
// });


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use("/api/v1/users", userRoute);

export  {app};
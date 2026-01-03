import express, { urlencoded } from 'express'
import cors from 'cors'
import { LIMIT } from './constants.js';
import cookieParser from 'cookie-parser';

const app = express();
// app.use(cors(
//     {
//         origin : process.env.CORS_ORIGIN,
//         credentials : true
//     }
// ))
// import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.options(/.*/, cors());

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


// import routes
import userRoute from './routes/user.routes.js'
import captainRoute from './routes/captain.routes.js'
import mapsRoutes from './routes/map.routes.js'

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/captain", captainRoute)
app.use('/api/v1/maps', mapsRoutes)



export  {app};
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dbConnect = require('./config/dbConnect')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/authRoute')

dbConnect()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', authRouter)


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
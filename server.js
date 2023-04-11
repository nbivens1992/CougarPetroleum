require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 3500


console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))

app.use('/users', require('./routes/userRoutes'))

app.use('/quotes', require('./routes/quoteRoutes'))

app.use('/userInfo', require('./routes/userInfoRoutes'))

app.post('/index', async (req, res) => {
    try{
        const foundUser = await User.findOne({ username: req.body.username });
        if (foundUser) {
            let submittedPass = req.body.psw; 
            let storedPass = foundUser.password; 
            
            //const result = submittedPass===storedPass
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                res.redirect('/pages/QuoteHistory.html')
            } else {
                res.redirect('/pages/signUpForm.html')
            }
                
          } else {
            
            res.redirect('/pages/signUpForm.html')
          }
        } 
        catch (error) {
            res.send("Internal server error");
        }
});




app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
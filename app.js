const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

// Initializing app
const app = express()

// Running logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


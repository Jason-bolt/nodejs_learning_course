const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const connectDB = require('./config/db')

// Route files
const publicRoutes = require('./routes/public')

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
    defaultLayout: 'main_template'
}))
app.set('view engine', '.hbs')

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', publicRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


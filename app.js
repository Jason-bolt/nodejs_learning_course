const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const { default: mongoose } = require('mongoose')

// Route files
const publicRoutes = require('./routes/public')
const authRoutes = require('./routes/auth')
const storyRoutes = require('./routes/stories')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

// Initializing app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Running logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', handlebars.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    extname: '.hbs',
    defaultLayout: 'main_template'
}))
app.set('view engine', '.hbs')

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  }));

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Creating global variables
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', publicRoutes)
app.use('/auth', authRoutes)
app.use('/stories', storyRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


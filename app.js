const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

const db = require('./models')
const Record = db.Record
const User = db.User

app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/records', require('./routes/record'))


app.listen(port, () => {
  console.log(`the web is running on http://localhost:${port}`)
})
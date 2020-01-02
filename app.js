const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('success!')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
  res.send('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
  res.send('register')
})
// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})
app.listen(port, () => {
  console.log(`the web is running on http://localhost:${port}`)
})
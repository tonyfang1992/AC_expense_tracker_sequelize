const express = require('express')
const router = express.Router()

// 載入 model
const db = require('../models')
const Record = db.Record
const User = db.User

// 載入 auth middleware
const { authenticated } = require('../config/auth')



// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})


// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
  console.log(req.user.id)
  let errors = []

  if (!req.body.name || !req.body.date || !req.body.amount) {
    errors.push({ message: '所有*欄位都是必填' })
  }

  if (errors.length > 0) {
    return res.render('new', {
      errors,
      name: req.body.name,
      date: req.body.date,
      amount: req.body.amount
    })
  }
  let icon = ''
  let monthofdate = ''
  if (req.body.category === '家居物業') {
    icon += 'fa-home'
  }
  if (req.body.category === '交通出行') {
    icon += 'fa-shuttle-van'
  }
  if (req.body.category === '休閒娛樂') {
    icon += 'fa-grin-beam'
  }
  if (req.body.category === '餐飲食品') {
    icon += 'fa-utensils'
  }
  if (req.body.category === '其他') {
    icon += 'fa-pen'
  }
  monthofdate += req.body.date[0] + req.body.date[1]
  Record.create({
    name: req.body.name,
    category: icon,
    date: req.body.date,
    amount: req.body.amount,
    UserId: req.user.id,
    month: monthofdate,
    merchant: req.body.merchant
  })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

//分類
router.get('/search', authenticated, (req, res) => {
  let totalAmount = Number(0)
  console.log(req.query.Month)
  console.log(req.query.classification)
  if (req.query.Month === 'all') {
    Record.findAll({ where: { category: `${req.query.classification}`, UserId: req.user.id } })
      .then((Records) => {
        for (let i = 0; i < Records.length; i++) {
          totalAmount += Number(Records[i].amount)
          console.log(totalAmount)
        }
        return res.render('index', { Records: Records, totalAmount: totalAmount })
      })
      .catch((error) => { return res.status(422).json(error) })
  }
  else {
    Record.findAll({ where: { month: `${req.query.Month}`, category: `${req.query.classification}`, UserId: req.user.id } })
      .then((Records) => {
        for (let i = 0; i < Records.length; i++) {
          totalAmount += Number(Records[i].amount)
          console.log(totalAmount)
        }
        return res.render('index', { Records: Records, totalAmount: totalAmount })
      })
      .catch((error) => { return res.status(422).json(error) })
  }


})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {


  let select = ({
    home: '',
    van: '',
    grin: '',
    utensils: '',
    pen: ''
  })

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((Records) => {
      if (Records.category === 'fa-home') {
        select.home += 'select'
      }
      if (Records.category === 'fa-shuttle-van') {
        select.van += 'select'
      }
      if (Records.category === 'fa-grin-beam') {
        select.grin += 'select'
      }
      if (Records.category === 'fa-utensils') {
        select.utensils += 'select'
      }
      if (Records.category === 'fa-pen') {
        select.pen += 'select'
      }
      return res.render('edit', { Records: Records })
    })
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  let errors = []

  if (!req.body.name || !req.body.date || !req.body.amount) {
    errors.push({ message: '所有*欄位都是必填' })
  }

  if (errors.length > 0) {
    return res.render('new', {
      errors,
      name: req.body.name,
      date: req.body.date,
      amount: req.body.amount
    })
  }
  let icon = ''
  if (req.body.category === '家居物業') {
    icon += 'fa-home'
  }
  if (req.body.category === '交通出行') {
    icon += 'fa-shuttle-van'
  }
  if (req.body.category === '休閒娛樂') {
    icon += 'fa-grin-beam'
  }
  if (req.body.category === '餐飲食品') {
    icon += 'fa-utensils'
  }
  if (req.body.category === '其他') {
    icon += 'fa-pen'
  }
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((record) => {
      record.name = req.body.name
      record.category = icon
      record.date = req.body.date
      record.amount = req.body.amount

      return record.save()
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
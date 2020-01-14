const express = require('express')
const router = express.Router()

const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  let totalAmount = Number(0)
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then((Records) => {
      for (let i = 0; i < Records.length; i++) {
        totalAmount += Number(Records[i].amount)
        console.log(totalAmount)
      }
      return res.render('index', { Records: Records, totalAmount: totalAmount })
    })
    .catch((error) => { return res.status(422).json(error) })

})

module.exports = router
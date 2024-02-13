const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })

})

  router.get('/db/:id', async (req, res) => {
    try {
      const id = req.params.id
  
      const [options] = await pool
        .promise()
        .query(`SELECT * FROM endo_dish_score WHERE id = ${id}`)
      res.json({
      
      })
    } catch (error) {
      console.log(error)
      res.sendStatus(500)

    }

})
module.exports = router
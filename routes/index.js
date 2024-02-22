const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })

})
router.get('/review', async function (req, res) {
  try {
    const id = req.params.id 
    
    return res.render('review.njk', {
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/review/:id', async (req, res) => {
  try {
    const id = req.params.id
  }  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
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

router.get('/newreview', function (req, res) {
  res.render('Xreview.njk', {title: 'new review'})
})

router.post('/newreview', async function(req, res) {
  //console.log(req.body)
  //plocka ut värdena vi ska ha
  //använda name/id från inputfälten
  const dish = req.body.dish
  const description = req.body.description
  console.log(dish, description)
  //säkerheten, vad har vi för data??
  //INSERT INTO `endo_dish_score` (`title`, `text`) VALUES
  //('Korv', 'glizzzyy');

  res.json(req.body)
})

module.exports = router
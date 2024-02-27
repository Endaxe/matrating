const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })

})


router.get('/dishes', async function (req, res) {
  try {
    const [dishes] = await pool.promise().query(
      `SELECT * from endo_dish`
    );
    return res.render('dishes.njk', {
      title: 'dish',
      dishes
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


router.get('/dishes/new', async function (req, res) {
  try {
    const [reviews] = await pool.promise().query('SELECT * FROM endo_dish')
    return res.render('dishes.njk', {
      title: 'New review',
      reviews: reviews
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


router.get('/dishes/:id/delete', async function (req, res) {
  try {
    const [result] = await pool.promise().query(
      `DELETE FROM endo_dish WHERE id = ?`,
      [req.params.id]
    )
    res.redirect('/dishes')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/dishes/:id', async (req, res) => {
  try {
    const id = req.params.id
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


router.get('/newreview', function (req, res) {
  res.render('Xreview.njk', { title: 'new review' })
})




router.post('/newreview', async function (req, res) {
  //console.log(req.body)
  //plocka ut värdena vi ska ha
  //använda name/id från inputfälten
  //säkerheten, vad har vi för data??
  const title = req.body.title
  const dish = req.body.dish
  const description = req.body.description
  const text = req.body.text
  const score = req.body.score
  console.log(dish, description)

  const [result] = await pool.promise().query('INSERT INTO endo_dish_score (title, text, score) VALUES (?, ?, ?)', [title, text, score])

  console.log(result)

  if (result.affectedRows === 1) {
    res.redirect('/dishes')
  } else {
    res.redirect('/newreview')
  }


})


module.exports = router

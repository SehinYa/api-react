const express = require('express')
const router = express.Router()
const app = express()
const application = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
});

module.exports = router;

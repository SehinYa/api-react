const express = require('express');
const router = express.Router();
const ApplicationService = require('./libs');
const { application } = require('express');
const Application = require('../../database/Application');
const app = require('express')();
const cors = require('cors');


router.use(cors());
/* POST users listing. */
router.post('/', async function(req, res) {
  
  //extract the data we need
  const {first_name, last_name, email, position} = req.body;
  console.log(req.body)
  //pass that along to a function that would create the record in the database 
  const  applications = await ApplicationService.createApplication(first_name, last_name, email, position);
  console.log(applications.toJson)
  res.send(applications);
 
});

router.get('/applicants', (req, res, next) => {
  Application.findAll({attributes: ['first_name', 'last_name', 'email', 'position']}).then( data => {
    console.log(`data:`,data);
    res.status(200).json({ applicants: data }) 
  }).catch(err => next(err));
})

/* GET users listing. */
/*router.get('/', function(req, res) {
  res.send('respond with a resource');
});*/

/*
app.get('/api', (req, res) => {
  res.clearCookie('applications_sid');
  res.status(200).send({ inSession: false });
});*/








module.exports = router;

const express = require('express');
const router = express.Router();
//const axios = require('axios');
const ApplicationService = require('./libs');
const { application } = require('express');
const Application = require('../../database/Application');
//const app = require('../../app');
const app = require('express')();



/* POST users listing. */
router.post('/', async function(req, res) {
  
  //extract the data we need
  const {first_name, last_name, email, position} = req.body;

  //pass that along to a function that would create the record in the database 
  const  applications = await ApplicationService.createApplication(first_name, last_name, email, position);
  console.log(applications.toJson)
  res.send(applications);
 
});


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


app.get('/api', (req, res) => {
  res.clearCookie('applications_sid');
  res.status(200).send({ inSession: false });
});

router.get('/allapplicationsdata', (req, res, next) => {
  Application.findAll({attributes: ['first_name', 'last_name', 'email', 'position']}).then( data => {
    res.status(200).json({ allApplicationsData: data }) 
  }).catch(err => next(err));
})

/* PUT users listing. */

router.put('/:id', (req, res, next) => {
  application.update({
    first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, position: req.body.position
    },
    {
    where: {
      id: parseInt(req.params.id)
    }
  }).then( (applications) => {
    applications ? res.status(200).send({ msg: "Applicant Updated" }) : res.status(200).send({ errMsg: "Applicant Doesn't Exist", badID: true}) }).catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  applications.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then( result => {
    result ? res.status(200).send({ msg: "Applicant Deleted" }) : res.status(200).send({ errMsg: "Applicant Doesn't Exist", badID: true})
  }).catch( err => next(err))
});




module.exports = router;

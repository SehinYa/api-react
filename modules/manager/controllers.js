const express = require('express');
const router = express.Router();
const ManagerService = require('./libs');
const Application = require('../../database/Application');
const { manager } = require('express');
const bcrypt = require('bcryptjs');
const app = require('express')();


/* POST users listing. */
router.post('/', async function(req, res) {
  
  //extract the data we need
  const {username, password} = req.body;

  //pass that along to a function that would create the record in the database 
  const  managers = await ManagerService.createManagers(username, password);
  console.log(manager)
  res.send(manager);
 
});

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/managers', (req, res) => {
  res.clearCookie('managers_sid');
  res.status(200).send({ inSession: false });
})
/*
router.get('/allapplicationsdata', (req, res, next) => {
  Application.findAll({attributes: ['first_name', 'last_name', 'email', 'position']}).then( data => {
    res.status(200).json({ allApplicationsData: data }) 
  }).catch(err => next(err));
})*/


module.exports = router;

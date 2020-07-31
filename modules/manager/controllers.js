const express = require('express');
const router = express.Router();
const ManagerService = require('./libs');
const { manager } = require('express');
const bcrypt = require('../../database/Manager');
//const { default: Manager } = require('../../../resumeapplication/src/Manager');
const cors = require('cors');


router.use(cors());
/* GET users listing. */
router.post('/', async function(req, res) {
  
  //extract the data we need
  const {username, password} = req.body;
  console.log(req.body)
  //pass that along to a function that would create the record in the database 
  const  manager = await ManagerService.createManager(username, password);
  console.log(manager.toJson)
  res.send(manager);
 
});

router.get('/logout', (req, res) => {
  res.clearCookie('manager_sid');
  res.status(200).send({ inSession: false });
})

router.get('/applicants', (req, res, next) => {
  User.findAll({attributes: ['username']}).then( data => {
    res.status(200).json({ allUserData: data }) 
  }).catch(err => next(err));
})

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

const express = require('express');

const router = express.Router();
//const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();

const userModel = require('../models/user-model');

router.route('/one')
    .get((req, res) => {
        res.json("We have a user!");
    });

router.route('/create')
	.post((req, res) => {
		let newUser = new userModel();
		newUser.name = req.body.name;
		newUser.address = req.body.address;
		newUser
           .save()
           .then(()=> {
               res.status(200).send("User saved");
           })
           .catch(()=>{
               res.status(500).send('Something happened');
           });
	});

router.route('/all')
	.get((req, res) => {
		userModel.find({})
           
           .then((users) => {
               res.status(200).json(users);
           })
           .catch(() => {
               res.status(500).send('Something happened');
           });
	});

router.route('/:id')
	.get( (req,res) => {
		userModel.findById(req.params.id)

			.then((user) => {
				res.status(200).json(user);
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

router.route('/remove/:id')
	.delete((req, res) => {
		userModel.findByIdAndRemove(req.params.id)
			.then((user) => {
				res.status(200).json('Remove complete');
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

router.route('/update/:id')
	.patch((req, res) => {
		userModel.findByIdAndUpdate(req.params.id, {name: req.body.name}) 
			.then((user) => {
				res.status(200).json('Update complete');
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})



module.exports = router;
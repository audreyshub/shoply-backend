//Routes step 1.- Separate the routes into a different file
const express = require('express');

const router = express.Router();


const itemModel = require('../models/items-model');

//Do some routes
router.use(function (req, res, next) {
   console.log("route middleware");
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

router.route('/jon')
    .get((req, res) => {
        res.json("Jon is amazing");
    });

router.route('/audrey/student')
    .post((req, res) => {
        res.json("Audrey is amazing");
    });

router.route('/create')
	.post((req, res) => {
		console.log(req.body);
		let newItem = new itemModel();
		newItem.name = req.body.name.toLowerCase();
		newItem.price = req.body.price;
		newItem.quantity = req.body.quantity;
		newItem
           .save()
           .then((savedItem)=> {

               res.status(200).json(savedItem);
           })
           .catch(()=>{
               res.status(500).send('Something happened');
           });
	});

router.route('/all')
	.get((req, res) => {
		
		
		itemModel.find({})
           
           .then((items) => {
               res.status(200).json(items);
           })
           .catch(() => {
               res.status(500).send('Something happened');
           });
	});

router.route('/:id')
	.get( (req,res) => {
		itemModel.findById(req.params.id)

			.then((item) => {
				res.status(200).json(item);
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})	

router.route('/remove/:id')
	.delete((req, res) => {
		itemModel.findByIdAndRemove(req.params.id)
			.then((item) => {
				res.status(200).json(item);
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

router.route('/update/:id')
	.patch((req, res) => {
		itemModel.findByIdAndUpdate(req.params.id, {name: req.body.name}) 
			.then((item) => {
				res.status(200).json(item);
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})	

router.route('/getbyname/:name')
	.get((req, res) => {
		itemModel.find({name: new RegExp('^*'+req.params.name+'$*', "i")})
			.then((items) => {
				res.status(200).json(items);
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

router.route('/check/:id')
	.patch((req, res) => {
		itemModel.findByIdAndUpdate(req.params.id, { $set: { check: true }})
			.then((items) => {
				res.status(200).json('item check');
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

router.route('/uncheck/:id')
	.patch((req, res) => {
		itemModel.findByIdAndUpdate(req.params.id, { $set: { check: false }})
			.then((items) => {
				res.status(200).json('item uncheck');
			})
			.catch(() => {
				res.status(500).send('Something happened');
			});
	})

//Routes step 2.- Export the router to be public
module.exports = router;
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);	// Declares which mongodb database we're using
var bodyParser = require('body-parser');

// app.get('/', function(req, res){
// 	res.send('Hello World from server.js!');
// });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Endpoints
app.get('/contactlist', function(req, res){
	console.log('I received a GET request');
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);

	})
});	// End app.get

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert({ name: req.body.name, email: req.body.email, number: req.body.number }, function(err, doc){
		res.json(doc);
	})
});	// End app.post

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("id", id);
	db.contactlist.remove({ _id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});	// End app.delete

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({ _id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});	// End .get

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: { _id: mongojs.ObjectId(id)}, 
		update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

app.listen(7000);
console.log("Server running on port 7000");
/*Defines the functionality for the routes that require interaction with the MongoDB database model, including adding, retrieving, and deleting user objects.*/
var crypto   = require('crypto');
var mongoose = require('mongoose');
var Training = mongoose.model('Training'); 
var fs       = require('fs');


exports.addTraining = function(req, res){
	//Get file
	var original_name = req.file.originalname;
	var tmp_path = req.file.path;
	var file_name = req.file.filename;

	readJSONFile(tmp_path, function (err, trainingFile) {
		if(err) { 
	  		throw err; 
		}
	    var values,
		    properties = [],
		    t_values = [],
		    x_values = [],
		    y_values = [],
		    z_values = [];

        properties = Object.keys(trainingFile.training[0]);
		
		var training = new Training({training:req.body.date});
		training.set('style', req.body.style);
        
        for (var p in trainingFile.training)
        {
        	training.t_values.set(p, trainingFile.training[p].time);
            training.x_values.set(p, trainingFile.training[p].x);
			training.y_values.set(p, trainingFile.training[p].y);
			training.z_values.set(p, trainingFile.training[p].z);
        }

		training.set('user_id', req.session.user);
		training.save(function(err) {
		if (err){
			res.session.error = err;
		} else { 
			req.session.msg = 'Training on ' + training.date + 'added successfuly';
			res.redirect('/');
		} 
	});
	});
};

exports.getTrainings = function(req, res) {
	Training.find({ user_id: req.session.user }).exec(function(err, trainings) {
		if (!trainings){
			res.json(404, {err: 'Training Not Found.'});
		} else { 
			res.json(trainings);
		}
	});
};

exports.getTraining = function(req, res) {
	Training.findOne({ _id: req.params.id }).exec(function(err, training) {
		if (!training){
			res.json(404, {err: 'Training Not Found.'});
		} else { 
			res.json(training);
		}
	});
};

exports.deleteTraining = function(req, res){ 
	Training.findOne({ _id: req.params.id }).exec(function(err, training) { 
		if(training){ 
			training.remove(function(err){ 
				if (err){ 
					req.session.msg = err;
				}
				
				res.redirect('/trainings');

			});
		} else{
			req.session.msg = "Training Not Found!"; 
			res.redirect('/trainings');
		}
	});
};

function readJSONFile(filename, callback) {
  	fs.readFile(filename, function (err, data) {
	    if(err) {
	      callback(err);
	      return;
	    }
	    try {
	      callback(null, JSON.parse(data));
	    } catch(e) {
	      callback(e);
	    }
  	});
}
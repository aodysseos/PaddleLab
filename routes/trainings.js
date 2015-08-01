var express = require('express');
var crypto  = require('crypto');
var router = express.Router();
var trainings = require('../controllers/trainings_controller');

router.use('/public', express.static( 'public'));
router.use('/lib', express.static( 'lib'));
router.use('/assets', express.static( 'assets'));

router.get('/training', function(req, res){
	if (req.session.user) {
		res.render('training', {
			user:req.session.username,
			msg:req.session.msg});
	} else { 
		req.session.msg = 'No training data!'; 
		res.redirect('/');
	}
});

router.get('/trainings', function(req, res){
	if (req.session.user) {
		res.render('trainings', {
			username:req.session.username,
			msg:req.session.msg
		});
	} else { 
		req.session.msg = 'Access denied!'; 
		res.redirect('/login');
	}
});

router.get('/trainings/analysis/:id', function(req, res){
	if (req.session.user) {
		res.render('dashboard', {
			username:req.session.username,
			msg:req.session.msg
		});
	} else { 
		req.session.msg = 'Access denied!'; 
		res.redirect('/login');
	}
});

router.get('/trainings/all', trainings.getTrainings);
router.post('/training/add', trainings.addTraining);
router.get('/trainings/delete/:id', trainings.deleteTraining);
router.get('/trainings/analysis/performance/:id', trainings.getTraining);

module.exports = router;



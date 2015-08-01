/*Defines the training object model.*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TrainingSchema = new Schema({
	date: { type : Date, default: Date.now },
	style: String,
	t_values: [String],
	x_values: [Number],
	y_values: [Number],
	z_values: [Number],
	user_id: String
}); 

mongoose.model('Training', TrainingSchema);
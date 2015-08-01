/*Defines the user object model.*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserSchema = new Schema({
	timestamp: { type : Date, default: Date.now },
	username: { type: String, unique: true },
	email: String,
	age: { type: Number, min: 12, max: 65 },
	color: String,
	hashed_password: String 
}); 
mongoose.model('User', UserSchema);
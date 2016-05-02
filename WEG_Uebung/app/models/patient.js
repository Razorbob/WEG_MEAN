var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//Patient Schema
/*	From Java
	private int blutDruckD = 80;
    private int blutDruckS = 70;
    private String email = "beispiel@email.com";
    private String gebdatum = "21.02.1993";
    private String geschlecht= "Männlich";
    private String nachname= "Nachname";
    private int puls = 120;
    private int svn = 2288;
    private String vorname = "VornamePlaceholder";
*/

var PatientSchema = new Schema({ 
	vorname: String,
	nachname: String,
	blutDruckD: Number,
	blutDruckS: Number,
	puls: Number,
	svn: { type: Number, required: true, index: { unique: true }},
	email: String,
	gebdatum: Date,
	geschlecht: String,
});



//return model
module.exports = mongoose.model('Patient', PatientSchema);
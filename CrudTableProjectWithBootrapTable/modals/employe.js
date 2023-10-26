const mongoose = require('mongoose');
const EmpSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    dob:Date
});
module.exports = mongoose.model('Employ',EmpSchema);
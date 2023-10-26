const mongoose = require('mongoose');
const Employ = require('../modals/employe');
const seedData = require('./fakeData');

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/CrudTable')
.then(()=>{
  console.log('Network connected');
}).catch(
  err=>{
    console.log('Network error');
    console.log(err);
  }
)

const seedDB = async()=>{
    await Employ.deleteMany({});
    await Employ.insertMany(seedData)
    .then(()=>{
        console.log('Data Inserted');
    }).catch((err)=>{
        console.log("Error in adding the data ", err)
    })
}

seedDB().then(()=>{
    mongoose.connection.close();
})
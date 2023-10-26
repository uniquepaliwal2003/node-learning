const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,'/docs')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
const Employ = require('./modals/employe');
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
// read
app.get('/employtable',async(req,res)=>{
    const info = await Employ.find({});
    // console.log(info)
    res.render('unique-crud',{info});
})
// create
app.get('/newEmploy',async(req,res)=>{
    res.render('unique-create');
})
app.post('/employtable',async(req,res)=>{
    // console.log(req.body)
    const newEmploy = new Employ({
        name:req.body.name,
        phone:req.body.phone,
        dob: new Date(req.body.dob)
    })
    await newEmploy.save();
    res.redirect("/employtable");
})
// delete
app.delete('/employtable/:id',async(req,res)=>{
    const {id} = req.params;
    await Employ.findByIdAndDelete(id);
    res.redirect('/employtable');
})
// edit
app.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const emp = await Employ.findById(id);
    console.log(emp)
    res.render('unique-edit.ejs',{emp})
})
app.put('/employtable/:id',async(req,res)=>{
    const { id } = req.params;
    const emp = await Employ.findById(id);
    let namee = emp.name 
    let phonee = emp.phone
    let dobe = new Date(emp.dob)
    if(req.body.name){
        namee = req.body.name;
    }
    if(req.body.dob){
        dobe = new Date(req.body.date)
    }
    if(req.body.phone){
        phonee = req.body.phone;
    }
    await Employ.findByIdAndUpdate(id,{name:namee, phone:phonee, dobe:new Date(dobe)})
    
    res.redirect('/employtable')
})

app.listen(3000 ,()=>{
    console.log('working on port 3000')
})

// new Date().getDate()          // Return the day as a number (1-31)
// new Date().getDay()           // Return the weekday as a number (0-6)
// new Date().getFullYear()      // Return the four digit year (yyyy)
// new Date().getHours()         // Return the hour (0-23)
// new Date().getMilliseconds()  // Return the milliseconds (0-999)
// new Date().getMinutes()       // Return the minutes (0-59)
// new Date().getMonth()         // Return the month (0-11)
// new Date().getSeconds()       // Return the seconds (0-59)
// new Date().getTime()          // Return the time (milliseconds since January 1, 1970)
//This file is just to add or seed some data into database so it will be easy to create the things around the data instead of working with empty database and applying logic in it .
const mongoose = require('mongoose');
const Product = require('../modals/product')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then( ()=>{
    console.log("Connection open to mongoose!!")
}).catch( err=> {
    console.log("oh no something was wrong in connecting mongoose")
})
const p = new Product({
    name:'Ruby GrapeFruit',
    price:1.99,
    category:'fruits'
})
p.save().then( ()=>{
    console.log(p);
}).catch( err=>{
    console.log("This product does not work", err );
})
const dairyProduct = [
    {
        name:'Soya Paneer',
        price:3.33,
        category:'dairy'
    },
    {
        name:'Apples',
        price:3.99,
        category:'fruits'
    },
    {
        name:'Organic Celery',
        price:1.99,
        category:'vegetables'
    },
    {
        name:'Chocolate Whole milk',
        price:2.68,
        category:'dairy'
    }
]
    Product.insertMany(dairyProduct).then( ()=>{
        console.log("So we got all the items we wanted")
        console.log(dairyProduct)
    }).catch( err=>{
        console.log("some error occured so we did not enter anything inside",err)
    })

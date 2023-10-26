const express = require('express');
const app = express();

const path = require('path');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const Product = require('./modals/product');

const mongoose = require('mongoose');
mongoose.set('strictQuery','true');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
  .then(()=>{
    console.log("COnnectION OPEN");
  }).catch(err=>{
    console.log(err);
    console.log("Connection failed");
  })

const categories = ['fruits','vegetables','dairy'] 

app.get('/products',async (req,res)=>{
  const products = await Product.find({});
  console.log(products);
  res.render('products/index',{products})
})

app.get('/products/new',async(req,res)=>{
  res.render('products/new',{categories})
})

app.get('/products/:id/edit',async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('products/edit',{product,categories});
})

app.post('/products',async (req,res)=>{
  const newProduct = new Product(
    {
      name:req.body.nameP,
      price:req.body.namePr,
      category:req.body.nameC
    })
  await newProduct.save();
  console.log(newProduct._id)
  res.redirect(`/products/${newProduct._id}`)
})

app.put('/products/:id',async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
  res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/show',{product})
})

app.delete('/products/:id',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000,()=>{
  console.log("Serving on port 3000");
})
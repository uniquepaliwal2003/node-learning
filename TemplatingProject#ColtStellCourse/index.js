const express = require('express')
const app = express();
const redditData = require('./data.json');

const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
  const cata = ['lily','rosa','machi'];
  res.render('cats',{cata});
})

app.get('/rand',(req,res)=>{
  const rand = Math.floor(Math.random()*5+1);
  res.render('random',{rand});
})

app.get('/r/:subreddit',(req,res)=>{
  const {subreddit} = req.params;
  const data =  redditData[subreddit];
  if(data)
    res.render('subre',{...data});
  else
    res.render('notfound',{subreddit })
})

app.get('/')

app.listen(3000,()=>{
  console.log("listening from port 3000");
})
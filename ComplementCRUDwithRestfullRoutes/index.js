//create                        - C
// get    /comments/new         - Show a form for new comments.
// post   /comments             - Create new comments.
//read                          - R
// get    /comments             - Show list all comments.
// get    /comments/:id         - Show details about specific comments.
//update                        - U
// get    /comments/:id/edit    - Show a form for edit a comment.
// patch  /comments/:id         - update one comment.
//delete                        - D
// delete /comments/:id         - destroy one comment.

//starting our express app.
const express = require('express');
const app = express();

const path = require('path');

//this to generate the unique id
const { v4 : uuidv4 } = require('uuid');

//to parse the comming form request.
app.use(express.urlencoded({extended:true}));
//to parse the json requrest.
app.use(express.json());

//This is to use the patch method from the form just add ?_method=PATCH to the form action after writing the path in the action attribute of the form. Make sure you actually send the post request in the form action.
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//adding the engine - ejs.
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//faking the database.
let comments = [
    {
      id:uuidv4(),
      username:'Tod' ,
      comment:'I like that is funny'
    },
    {
      id:uuidv4(),
      username:'jenny' ,
      comment:'gossip girl is eric senior'
    },
    {
      id:uuidv4(),
      username:'Ryan' ,
      comment:'I like you arya'
    },
    {
      id:uuidv4(),
      username:'Arya' ,
      comment:'I am greater good than god'
    }
  ]

//just dummy routes to see the app is working or not
app.get('/tacos',(req,res,next)=>{
  res.send('hello from tacos This is unique paliwal');
})
app.post('/tacos',(req,res)=>{
    console.log(req.body)
    res.send(`name  -  ${req.body.name} `);
})

//Implement the restfull structure.
//create
app.get('/comments/new',(req,res)=>{
  res.render('comments/new');
})
app.post('/comments',(req,res)=>{
  const { username,comment } = req.body;
  comments.push({username,comment,id:uuidv4()});
  // doing redirect instead of render makes sense here - in case of the render when you get in the next page and then do reload it will ask you to resubmit the form which whill eventually lead to the repeatition of submission in the form .... so do redirect instead..
  res.redirect('/comments');
})

//edit
app.get('/comments/:id/edit',(req,res)=>{
  const {id} = req.params;
  const comm = comments.find(c=>c.id===id);
  res.render('comments/edit',{comm});
})
app.patch('/comments/:id',(req,res)=>{
  const {id} = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find( c=>c.id===id);
  foundComment.comment = newCommentText;
  res.redirect('/comments');
})

//delete
app.delete('/comments/:id',(req,res)=>{
  const { id } = req.params;
  comments = comments.filter(c=>c.id!==id);
  res.redirect('/comments');
})

//read
app.get('/comments',(req,res)=>{
  res.render('comments/index',{comments});
})
app.get('/comments/:id',(req,res)=>{
  const { id } = req.params;
  // let comm = {};
  // for( c of comments ){
  //   console.log(id,c.id);
  //   if( id === c.id ){
  //     comm = c ; 
  //   }
  // }
  const comm = comments.find(c=>c.id===id);
  res.render('comments/show.ejs',{comm});
})

//launching the express app.
app.listen(3000,()=>{
  console.log('Listening to port 3000');
})
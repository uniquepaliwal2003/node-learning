const express= require('express');
const app=express();
const path = require('path');
app.use( express.urlencoded({extended:true}));
app.use( express.json() );
app.get( '/tacos',(req,res)=>{
    res.send('getting result for get for /tacos');
})
app.post('/tacos',(req,res)=>{
    console.log( req.body );
    const { tacosName,passowrd } =req.body;
    res.send(` getting post request for the /tacos and and and we got tacoName as ${tacosName} and your password is.........drumrolllss ${passowrd}`);
});

app.listen(3000,()=>{
    console.log("live on port 3000")
});
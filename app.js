const express=require("express");
const path=require("path");
const app=express();
const bodyparser=require("body-parser");
var mongoose=require('mongoose');
const { Server } = require("http");
mongoose.connect('mongodb://localhost/contactdaan',{useNewUrlParser: true});
const port=8000;
//drfine monoose schema
var contactSchema= new mongoose.Schema({
    name:String,
    
    email:String,
    number:String,
    message:String
});
var contact=mongoose.model('Contact',contactSchema);

// //express specific stuff
 app.use('/static',express.static('static'));
 app.use(express.urlencoded())

//pug specific stuff
app.use('view engine','pug')//Set the templates engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//end points
// app.get('/',(req,res)=>{
//     const params={}
//     res.status(200).render('1.pug',params);
// })

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item was save to database")

    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    })
    res.status(200).render('2.pug',params);
})
//start the Server
app.listen(port,()=>
{
    console.log(`application started on port ${port}`);
});
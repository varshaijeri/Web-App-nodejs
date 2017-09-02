const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//1 way ---->  using middleware
app.use(express.static(__dirname+"/public"));

app.get('/bad',(req, res) => {
    res.send({errMsg : "Not Available"})
});


//using middleware with next
app.use((req, res, next) => {
    var now = new Date().toString();
    var logMsg = `${now} : ${req.method} ${req.url}`;
    console.log(logMsg);
    fs.appendFile('server.log',logMsg+"\n");
    next();
    //app.render();
});

app.use((req,res,next) => {
    res.render('maintainance.hbs');
})



//3 way ----> using template engine for dynamic binding of data
//configure handle bar template engine
app.set('view engine','hbs');

//to inject the data dynamically by functions
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
//helper function with parameter
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})
app.get('/about',(req,res) => {
    //directly looks into views folder for the specified template
    res.render('about.hbs',{head:"About Page"})
});
app.get('/home',(req,res) => {
    //directly looks into views folder for the specified template
    res.render('home.hbs',{head:"Home Page",welcomeMsg: "Welcome to my website"})
});

//2 way ----->using methods given by express
app.get('/',(req, res) => {
    //req:info like headers body or the request data that was made
    res.send('Hello world');
});


app.get('/maintainance',(req,res) => {
    //directly looks into views folder for the specified template
    res.render('about.hbs');
});
//to inject the partial views
hbs.registerPartials(__dirname+"/views/partials");


app.listen(3000,()=>{
    console.log("Server is up and running on port 3000")
});
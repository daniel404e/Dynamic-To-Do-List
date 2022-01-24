const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended : true }));
app.use(express.static("public"));

var itemz = [];
var clicked =[];

app.get("/",function(req,res){

    var today = new Date();
    var options = {
    
         weekday: "long",
         day: "numeric",
         month: "long"
        };
      
         var day = today.toLocaleDateString("en-US",options);

     res.render("list",{whatday: day, additem: itemz , clicks: clicked});

});


app.post("/",function(req,res){
     
    var additem = req.body.newitem;
    var clickdataraw=[];
    var clickdatarefi=[];
    clickdataraw = req.body.inpclick2;
    clickdatarefi=JSON.parse(clickdataraw);
    
    console.log(clickdatarefi);
    itemz.push(additem);
    clicked=clickdatarefi; 
    res.redirect("/");  


});


app.post("/delete",function(req,res){
     
    var todelete = req.body.dbutton;
    var clickdataraw=[];
    var clickdatarefi=[];
    clickdataraw = req.body.inpclick;
    
     clickdatarefi=JSON.parse(clickdataraw);
     
      
    clickdatarefi.splice(todelete,1);
    itemz.splice(todelete,1); 
     
      
    console.log(clickdatarefi);
    clicked=clickdatarefi; 
     res.redirect("/");  


});



 


app.listen(process.env.PORT || 3000,function(){console.log("on 3k");});
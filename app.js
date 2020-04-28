const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

   var data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }

     ]
   };

  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us8.api.mailchimp.com/3.0/lists/2a1b4f3491",
    method: "POST",
    headers:{
      "Authorization":"rejdi1 b8f4c794c96d667c3cd48c016cd17364-us8"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error) {
      res.sendFile(__dirname + "/failure.html");
    }else{
      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



//b8f4c794c96d667c3cd48c016cd17364-us8
//2a1b4f3491

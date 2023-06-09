const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const req = require("express/lib/request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");

    
});

app.post("/", function (req, res) {
    
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
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

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/5a56964d3d";

    const options = {
        method: "POST",
        auth: "vinicius1:ba3802be7be9b51ad353a317cd0a53ae-us12"
    }

    const request = https.request(url, options, function(response){
        if  (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            var responseData = JSON.parse(data);
            console.log(responseData);
            
            
        })
    });
   
    request.write(jsonData);
    request.end();

     

});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
    req.body;
    console.log("server running on port 3000");
});

//api key
//ba3802be7be9b51ad353a317cd0a53ae-us12

//audienceId
//5a56964d3d
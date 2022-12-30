const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const data = {
    members: [{
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME:FirstName,
        LNAME: LastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/2c4dd97f78";
  const options = {
    method: "post",
    auth: "vikas1:9d7049b770fc4f3b89890eda21ac3f05-us9",
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running at port 3000");
});
// API key
// 9d7049b770fc4f3b89890eda21ac3f05-us9
// List id
// 2c4dd97f78

const Serial = require("./arduino/serial.js");
const Dictionary = require("./dictionary/dictionary.js");
const SerialConn = Serial();
const ColourDictionary = Dictionary();
var dict = null;

const Pattern = require("./dictionary/pattern.json");

ColourDictionary.then(function(result) {
  dict = result;
});

// Local Web Server dependencies
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get("/", function(req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/learn", function(req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname + "/view/learn.html"));
});

router.get("/test", function(req, res) {
  //__dirname : It will resolve to your project folder.
  res.sendFile(path.join(__dirname + "/view/test.html"));
});

router.post("/rgb", function(req, res) {
  console.log(req.body);
  // Look up colourname in the dictionary
  var hex = req.body["rgb"].substring(1); // retrieve the value and strip the 0x prefix
  var colourName = dict.getRGB565FromHex(hex);
  // Retrieve the pattern index from our json file
  var patternIndex = Pattern[colourName];
  console.log(colourName);
  // Output pattern index to serial out
  SerialConn.write(patternIndex.toString());
});

//add the router
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

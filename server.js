// Dependencies
// ===========================================================
var express = require("express");  // have to install
var bodyParser = require("body-parser");  // Needed to use POST,  have to install
var path = require("path");  // Internal package - don't have to install

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8081;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
var characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi-Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// ===========================================================

// Returns view.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Returns add.html
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Returns all character objects
app.get("/api/characters", function(req, res) {
  return res.json(characters);
})

// Returns a single character, or if character is not found, returns false
app.get("/api/characters/:chosen", function(req, res) {  // have to put "?" to make optional
  // Grab the selected parameter
  var chosen = req.params.chosen;
  console.log(chosen);

  // Filter to show only the selected character
  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {  // character is found in object array
      return res.json(characters[i]);
      break;
    }
  }
  return res.json(false);  // character was not found in object array
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  var newChar = req.body;   // Because the newChar info is sent to the server IN THE BODY
  console.log(newChar);
  characters.push(newChar);  // Push the new character object into the array of characters
  res.json(newChar);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

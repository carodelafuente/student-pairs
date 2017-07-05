const express = require('express')
const app = express()
var _ = require('lodash');
// var path = require('path');
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

var students = ["Nathan", "Eddy", "Tristan", "Tyler", "Salazar", "Guy", "Emily", "Leonard", "Tamrat"]

app.get('/', function(req, res) {
let splitPairs = (students) => {
  let list = []
  for (let i = 0; i < students.length; i += 1) {
    group = Math.floor(i / 2)
    member = i % 2
    if (list[group] === undefined) {
      list[group] = []
    }
    list[group][member] = students[i]

    if (i == students.length - 2) {
      i += 1
      member += 1
      list[group][member] = students[i]
    }
  }
  return list
}
  res.json(splitPairs(_.shuffle(students)))
});


app.get('/one', function(req, res) {
let splitPairs_ = (students) => {
  let pairs = []
  for (let i = 0; i < students.length; i+=2) {
    if (students[i+1] !== undefined) {
      pairs.push([students[i], students[i+1]])
    } else {
      pairs.push ([students[i]])
    }
  }
  return pairs
}
  res.json(splitPairs_(_.shuffle(students)))
});


//to link HTML??
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.mustache'));
});

app.get('/', function (req, res) {
  res.render('index')
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

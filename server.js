const express = require('express');
const fs = require('fs')
var uniqid = require('uniqid');
const notes = require('./db/db.json')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

// HMTL Routes
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, './public/index.html'))
})

//API CALLS

app.get("/api/notes", function(req, res){
  res.json(notesData);
});

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

function findById(id, notes) {
  const result = notes.filter(notes => notes.id === id)[0];
  return result;
}

// post notes
app.post('/api/notes', (req, res) => {
const{title, content} = req.body
let newNotes ={
  title,
  content,
  id:uniqid()
}
notes.push(newNotes);
console.log(notes)
fs.writeFileSync(path.join(__dirname, './db/db.json'),
JSON.stringify(notes)
)
  res.json(newNotes);
  res.status(201);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  //// http://localhost:3001/api/notes
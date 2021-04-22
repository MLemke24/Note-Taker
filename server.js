const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();

const fs = require('fs')
var uniqid = require('uniqid');
const path = require('path')


const allNotes = require('./db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(allNotes)
})

// // HMTL Routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  
  app.get('*', (req, res) => {
    res.sendFile(path.join( __dirname, './public/index.html'))
  })

  function newNote(body, allNotes) {
    const {title, text} = body
    let newNotes ={
      title,
      text,
      id:uniqid()
    }
  
    allNotes.push(newNotes);
  
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(allNotes)
    )
      return newNote;
  }

// New Post

app.post('/api/notes', (req, res) => {
  const Note = newNote(req.body, allNotes)
  console.log(newNote)
  res.json(Note)
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  //// http://localhost:3001

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
  res.json(allNotes.slice(1))
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

  // post notes
// app.post('/notes', (req, res) => {
// const{title, content} = req.body
// let newNotes ={
//   title,
//   content,
//   id:uniqid()
// }
// notes.push(newNotes);
// console.log(notes)
// fs.writeFileSync(path.join(__dirname, './db/db.json'),
// JSON.stringify(notes)
// )
//   res.json(newNotes);
//   res.status(201);
// })


function newNote(body, notesArray) {
  const newNote = body;
  if(!Array.isArray(notesArray))
  notesArray = [];

  if (notesArray.length === 0)
  notesArray.push(0);

  body.id = notesArray

  notesArray.push(newNote)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
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





// post notes
// app.post('/notes', (req, res) => {
// const{title, content} = req.body
// let newNotes ={
//   title,
//   content,
//   id:uniqid()
// }
// notes.push(newNotes);
// console.log(notes)
// fs.writeFileSync(path.join(__dirname, './db/db.json'),
// JSON.stringify(notes)
// )
//   res.json(newNotes);
//   res.status(201);
// })

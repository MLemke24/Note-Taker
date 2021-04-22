const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const fs = require('fs')
var uniqid = require('uniqid');
const path = require('path')


const notes = require('./db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


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


//API CALLS

app.get("/api/notes", function(req, res){
  console.log('/api/notes')
 return res.json(results);
});

app.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

// function findById(id, notes) {
//   const result = notes.filter(notes => notes.id === id)[0];
//   return result;
// }

// post notes
app.post('/notes', (req, res) => {
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
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const notes = require('./db/db.json')

// get notes
app.get('/api/notes', (req, res) => {
    // let results = notes
    console.log(req.query)
    res.json(notes)
})


// on click, get notes by id
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
    req.body.id = notes.length.toString();
      
    res.json(req.body);
  })

  function createNewNote(body) {
      console.log(body);

      return body;
  }


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  //// http://localhost:3001/api/notes
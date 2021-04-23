const router = require('express').Router();
const { newNote } = require('../lib/notes');
const note  = require('../db/db.json');

router.get('/notes', (req, res) => {
  let results = note
    res.json(results)
  })

  router.post('/notes', (req, res) => {
    const Note = newNote(req.body, allNotes)
    console.log(newNote)
    res.json(Note)
  });
  
  module.exports = router
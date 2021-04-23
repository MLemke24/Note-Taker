const router = require('express').Router();
const { newNote, deleteNote } = require('../lib/notes');
const note  = require('../db/db.json');

router.get('/notes', (req, res) => {
  let results = note
    res.json(results)
  })

  router.post('/notes', (req, res) => {
    const Note = newNote(req.body, note)
    console.log(newNote)
    res.json(Note)
  });

  router.delete('/notes/:id', (req, res) => {
    const result = deleteNote(req.params.id, note);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
});
  
  module.exports = router
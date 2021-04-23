const fs = require("fs");
const path = require("path");
var uniqid = require('uniqid');

// app.get('/api/notes', (req, res) => {
//     res.json(allNotes)
//   })

const allNotes = require('../db/db.json')

function newNote(body, allNotes) {
    const {title, text} = body
    let newNotes = {
      title,
      text,
      id:uniqid()
    }
  
    allNotes.push(newNotes);
  
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(allNotes)
    )
      return newNote;
  }


  module.exports = newNote

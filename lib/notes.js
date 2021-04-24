const fs = require("fs");
const path = require("path");
var uniqid = require('uniqid');


const allNotes = require('../db/db.json')

function newNote(body) {
    const {title, text} = body
    let newNotes = {
      title,
      text,
      id: uniqid()
    }
  
    allNotes.push(newNotes);
  
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(allNotes)
    )
      return newNote;
  }

  function deleteNote(id) {
    for (let i = 0; i < allNotes.length; i++) {
        let note = allNotes[i];

        if (note.id == id) {
            allNotes.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(allNotes, null, 2)
            );

            break;
        }
    }
}



  module.exports = { newNote, deleteNote }

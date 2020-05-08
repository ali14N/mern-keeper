import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes()
  }, [])
  function getNotes() {
    axios.get('/notes')
      .then(res => {
        console.log("Data fetched")
        const data = res.data
        setNotes(data)
      })
  }
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
    const payload = newNote
    axios({
      url: '/notes/add',
      method: 'POST',
      data: payload
    }).then(() => getNotes())
      .catch(err => console.log("error: " + err))
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

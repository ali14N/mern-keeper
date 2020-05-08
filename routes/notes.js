const router = require('express').Router()
let Note = require('../model/note.model')
router.route('/').get((req, res) => {
    Note.find()
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({ title, content })
    newNote.save()
        .then(() => res.json("Note Added"))
        .catch(err => res.status(400).json('Error ' + err))
})
module.exports = router
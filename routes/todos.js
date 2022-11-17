const express = require('express');
const router = express.Router();
const db = require('../config/database')

router.get('/', async (req, res) => {
    db.all('SELECT * FROM todos;', (err, result) => {
        if (err) {
            res.status(500);
        }


        res.json({
            result
        })
    })

})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    db.all('SELECT * FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500);
        }

        if (result.length == 0) {
            res.status(404)
        }

        res.json({
            'result': result[0]
        });
    })
})

router.post('/', async (req, res) => {
    const title = req.body.title || 'default';
    const description = req.body.description;

    db.run('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err) => {
        if (err) {
            res.status(500);
        }

        res.json({
            'status': 'success'
        });
    });
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;


    db.all('SELECT * FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500);
        }

        if (result.length == 0) {
            res.status(404)
        }

        var title = req.body.title || result[0].title;
        var description = req.body.description || result[0].description;

        db.run('UPDATE todos SET title = ?, description = ? WHERE id = ?', [id, title, description], (err) => {
            if (err) {
                res.status(500);
            }

            res.json({
                'status': 'success'
            });
        })
    })

})

router.put('/:id', async (req, res) => {
    const id = req.params.id

    db.all('SELECT * FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500);
        }

        if (result.length == 0) {
            res.status(404)
        }

        db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
            if (err) {
                res.status(500);
            }

            res.json({
                'status': 'success'
            });
        })
    })

})

module.exports = router
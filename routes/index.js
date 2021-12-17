const {TodoRepository} = require("../repositories/todo.repository");
const {v4: uuid} = require('uuid');
const express = require('express');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const router = express.Router();

/* GET home page. */
router
  .get('/', function(req, res, next) {
    (async () => {
      const allTodos = await TodoRepository.findAll();
      allTodos.forEach(todo => todo.createdAt = formatDistanceToNow(todo.createdAt, { addSuffix: true }));
      res.render('index', {
        todos: allTodos,
      });
    })()
  })

  .post('/delete/:id', (req, res) => {
    (async () => {
      await TodoRepository.delete({
        id: req.params.id,
      });
      res.render('deleted');
    })()
  })

  .post('/add/', (req, res) => {
    (async () => {
      const newTodo = new TodoRepository({
        id: uuid(),
        title: req.body.title,
      })
      await TodoRepository.insert(newTodo);
      res.render('added');
    })()
  })
;

module.exports = router;

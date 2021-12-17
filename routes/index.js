const {TodoRepository} = require("../repositories/todo.repository");
const {v4: uuid} = require('uuid');
var express = require('express');
var router = express.Router();

function goodDate() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

/* GET home page. */
router
  .get('/', function(req, res, next) {
    (async () => {
      const allTodos = await TodoRepository.findAll();

      allTodos.forEach(todo => todo.createdAt = todo.createdAt.toISOString().slice(0, 19).replace('T', ' '));

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
        createdAt: goodDate(new Date()),
      })

      await TodoRepository.insert(newTodo);

      res.render('added');

    })()
  })
;

module.exports = router;

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/testaroo');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});

var data = [
  {item: '11111'},
  {item: '22222'},
  {item: '23333'}
];

module.exports = function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item
    });
    res.json(data);
  });

};
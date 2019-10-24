const express = require('express');

const server = express();

server.use(express.json());

const users = ['Erick', 'João', 'Maria'];

server.use((req, res, next) => {

  console.log(`Method: ${req.method}; URL: ${req.url}` );

  return next();
});

server.get('/users', (req, res) => {

  return res.json({"users": users});

});

server.get('/users/:index', (req, res) => {

  const {index} = req.params;

  return res.json({"users": users[index]});

});

server.post('/users', (req, res) => {

  const {name} = req.body;

  users.push(name);

  return res.json({"users": users});
});

server.put('/users/:index', (req, res) => {

  const {index} = req.params;
  const {name} = req.body;

  users[index] = name;

  return res.json({"users": users});

});

server.delete('/users/:index', (req, res) => {
  
  const {index} = req.params;

  users.splice(index, 1);

  return res.json({"users": users});

});

server.listen(3000);
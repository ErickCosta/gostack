const express = require('express');

const server = express();

server.use(express.json());

const project_list = [];

const count = 0;

async function checkUserId(req, res, next){

  const {id} = req.params;

  const index = await project_list.findIndex(project => project.id == id);

  if (index == -1){
    return res.status(400).json({"error": "Project not found"});
  }
  
  return next();
  
}

server.use((req, res, next) => {

  console.log(`Calls: ${++count}`);
  
  return next();
});

server.get('/projects', (req, res) => {

  return res.json(project_list);
  
});

server.get('/projects/:id', checkUserId,async (req, res) => {
  
  const {id} = req.params;

  const index = await project_list.findIndex(project => project.id == id);

  return res.json(project_list[index]);

});

server.post('/projects', (req, res) => {

  const {id, title, tasks} = req.body;

  const project = ({id, title, tasks});

  project_list.push(project);

  return res.json(project);

});

server.put('/projects/:id', checkUserId, async (req, res) => {

  const {id} = req.params;

  const {title} = req.body;

  const index = await project_list.findIndex(project => project.id == id);

  const project = project_list[index];

  project.title = title;

  project_list.splice(index, 1, project);

  return res.json(project);

});

server.post('/projects/:id/tasks', checkUserId, async (req, res) => {

  const {id} = req.params;

  const {task} = req.body;

  const index = await project_list.findIndex(project => project.id == id);

  const project = project_list[index];

  project.tasks.push(task);

  project_list.splice(index, 1, project);

  return res.json(project);

});

server.delete('/projects/:id', checkUserId, async (req, res) => {

  const {id} = req.params;

  const index = await project_list.findIndex(project => project.id == id);

  project_list.splice(index, 1);

  return res.json(project_list);

});

server.listen(3000);
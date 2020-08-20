const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
//creating backend services enpoints for our vidly application

//create a service for managing the list of genres
const listofgenres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

app.get('/vidly.com/api/genres', (req, res) =>{
   res.send(listofgenres);
  
});
app.get('/vidly.com/api/genres/:id', (req, res) =>{
    
     const value = listofgenres.find(c => c.id === parseInt(req.params.id));
     //console.log(value);
     if(!value) return res.status(404).send("Genre not in the list");
     res.send(value);
     

});

app.post('/vidly.com/api/genres', (req, res) =>{
 const {error} = validateGenre(req.body);
 if(error) return res.status(404).send(error.details[0].message);
  //console.log(req.body);
 const genre = {
   id: listofgenres.length + 1,
   name: req.body.name

 };
 //console.log(genre);
 listofgenres.push(genre);
 res.send(genre);
  
  
});


app.put('/vidly.com/api/genres/:id', (req, res) =>{

  const value = listofgenres.find(c => c.id === parseInt(req.params.id));
  if (!value) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  value.name = req.body.name; 
  res.send(value);

});

app.delete('/vidly.com/api/genres/:id', (req, res) =>{
  
  const value = listofgenres.find(c => c.id === parseInt(req.params.id));
  if (!value) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const index = listofgenres.indexOf(value);
  listofgenres.splice(index,1);
  res.send(value);
  
});
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
 console.log(`Listening on port ${port}`);
});
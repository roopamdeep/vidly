const express = require('express');
const router = express.Router();

const listofgenres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

router.get('/', (req, res) =>{
   res.send(listofgenres);
  
  
});
router.get('/:id', (req, res) =>{
    
     const value = listofgenres.find(c => c.id === parseInt(req.params.id));
     //console.log(value);
     if(!value) return res.status(404).send("Genre not in the list");
     res.send(value);
     

});

router.post('/', (req, res) =>{
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


router.put('/:id', (req, res) =>{

  const value = listofgenres.find(c => c.id === parseInt(req.params.id));
  if (!value) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  value.name = req.body.name; 
  res.send(value);

});

router.delete('/:id', (req, res) =>{
  
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
module.exports = router;

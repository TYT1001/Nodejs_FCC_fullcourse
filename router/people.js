const express = require('express')
const router = express.Router();
const {people} = require('../data')



router.get('/',(req,res)=>{
    console.log(people)
    res.status(200).json({success: 'true', data: people})
  })
router.get('/:id',(req,res)=>{
    const person = people.find(person=>person.id === Number(req.params.id))
    res.status(200).json({success: 'true', data: person})
  })
  router.post('/',(req,res)=>{
    const {name} = (req.body)
    console.log(name)
    if(!name){
      res.status(400).json({success: 'false', msg: 'Please provide name value!'})
    }
    res.status(200).json({success: 'true', data: [...people,name]})
  })
  
  router.put('/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    const person = people.find(p=>p.id===Number(id))
    if(!person){
      res.status(400).json({success: 'false',msg: `no person with id ${id}`})
    }
    const newPerson = people.map(person=>{
      if(person.id == Number(id)){
        person.name = name
      }
      return person;
    })
    res.status(200).json({success: 'true',data: newPerson})
  })
  
  router.delete('/:id',(req,res)=>{
    const {id} = req.params
    const person = people.find((person)=> person.id === Number(req.params.id))
    if(person==undefined){
      res.status(400).json({success: 'false',msg: `no person with id ${id}`})
    }
    const newPeople = people.filter((person)=>person.id != Number(req.params.id))
    res.status(200).json({success: 'true',data: newPeople})
  })

  module.exports = router;
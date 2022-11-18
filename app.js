const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const logger = require('./logger')
const auth = require('./authorize')
const {people} = require('./data')

const peopleRoute = require('./router/people')

// setup static and middleware
app.use(morgan('tiny'))
app.use(express.static('./public'))

// parse json data
app.use(express.urlencoded({extended: false}))
// parse form data
app.use(express.json())
app.use('/api/postman/people',peopleRoute)


app.post('/login', auth, (req,res)=>{
  
  res.status(200).redirect('home')
})
app.get('/', (req, res) => {
  
  res.send('Home')
})
app.get('/home', (req,res)=>{
  res.sendFile(path.resolve(__dirname, './public/javascript.html'))
})
app.get('/api/people',(req,res)=>{
  
  res.status(200).json({success: 'true', data: people})
})
app.post('/api/people',(req,res)=>{
  const {name} = (req.body)
  console.log(name)
  if(!name){
    res.status(400).json({success: 'false', msg: 'Please provide name value!'})
  }
  res.status(200).json({success: 'true', person: name})
})
    

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/404.html'))
  })
app.listen(5000,()=>{
    console.log('Server is listening to port 5000...')
})
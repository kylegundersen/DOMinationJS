const express = require('express')
var opener = require("opener")
const app = express()
const port = 3000

const path = require('path')

// Serve up static content to test library
app.use('/', express.static(path.join(__dirname, '../example')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

// Check if server is running
app.listen(port, ()=>{
  const url = `http://localhost:${port}/index.html`;
  console.log(`Example app listening at ${url}`)
  opener(url);
});
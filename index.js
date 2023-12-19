const express = require('express');
const app = express();
const path = require('path');

const database = require('./database');
const currentPath = __dirname;

app.use(express.json());
app.use(express.static(currentPath));

app.get('/', (req, res)=>{
    const indexFile = path.join(currentPath, 'index.html');
    res.sendFile(indexFile);
})

app.get('/retrieve', database.retrieve);
app.post('/create', database.create);
app.delete('delete/:id', database.deleteuser);

app.listen(3000, ()=>{
    console.log('3000 server running')
})
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rishita',
    database:'sys'
});

connection.connect((err)=>{
    if(err){
        console.log('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

const retrieve = (req, res)=>{
    connection.query('SELECT * FROM appointment', (err, result)=>{
        if(err)console.log('Error executing query:', err);
        else res.json(result);
    })
}


const create = (req, res)=>{
    const {name, email, number} = req.body;
    const query = 'INSERT INTO appointment (name, email, number) VALUES (?, ?, ?)';
    connection.query(query,[name, email, number],(err, result)=>{
        if(err) console.log('Error executing query:', err);
        else res.json(result.insertId);
    })
}


const deleteuser =  (req, res)=>{
    const userId = req.params.id;   //get the user ID from the URL param

    const query = 'DELETE FROM appointment WHERE id=?'
    connection.query(query, [userId], (err, result)=>{
        if(err){
            console.log('unable to delete user:', err);
            res.status(500).json({error: 'unable to delete user'});
        }
        else{
            console.log('User deleted successfully');
            res.json({message: 'User deleted successfully'})
        }
    })
}

module.exports ={retrieve, create, deleteuser}
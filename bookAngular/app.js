const express = require('express');
var path = require('node:path');
var cors = require('cors');
var dbcon = require('./database').dbcon;

var app = express();
app.use(cors({ origin: "*" }));

app.use(express.urlencoded({extended:'true'}));
app.use(express.json());

app.get('/books', (req, res) => {   
    const sql = 'SELECT * FROM book';
    dbcon.query(sql,(err, result)=>{
        if(err){
            console.log(err);
            res.sendStatus(404).send('<h3>Book not found </h3>');
        } else {
            console.log(result);
            res.setHeader('Content-Type','application/json');
            res.send(result);
        }
    });

})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    let sql = 'SELECT * FROM book WHERE bookid = ?';
        dbcon.query(sql,[id], (err, result) => {
            if(err)
        {
           console.log(err);
           res.sendStatus(400).send('<h3>bad reuest!</h3>');
        }
        else
        {
            console.log(result);
            if(result.length === 0)
            {
               res.status(404).send('<h3>Book with id:'+id+' not found!</h3>');
            }
            else
            {
            res.setHeader('Content-Type','application/json');
            res.send(result);
            }
        }

    })
});

app.get('/bookform', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'bookForm.html'));
    // res.sendFile(path.join(__dirname, 'html', ));
})

app.post('/books', (req, res) => {
    let b = req.body;
    var sql = `INSERT INTO book VALUES(?, ?, ?)`;

    let bookid = b.bookid;
    let bookname = b.bookname;
    let bookprice = b.bookprice;
    console.log(`${bookid}, ${bookname}, ${bookprice}`);

    dbcon.query(sql, [bookid, bookname, bookprice], (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send('<h3>http post book failed! </br> sql error:' + err.message + '</h3>');
        } else {
            res.status(200).send('<h3>post book successful!</h3>');
        }
    })
})
app.delete('/books/:id', (req, res) => {
    const bookid = req.params.id;
    const sql = 'DELETE FROM book WHERE bookid = ?';
    console.log('book id of book to be deleted:' + bookid);
    dbcon.query(sql, [bookid], (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send('<h3>http delete book failed! </br> sql error:' + err.message + '</h3>');
        } else {
            res.status(200).send('<h3>delete book successful!</h3>');
        }
    })

})

app.put('/books/:id', (req, res) => {
    const bookid= req.params.id;
    var sql = `UPDATE book
             set bookname=?,bookprice=?
             where bookid=?
              `;
    console.log(req.body);
    const b = req.body;
    let bookname=b.bookname;  
   let bookprice=b.bookprice;

dbcon.query(sql, [bookname,bookprice,bookid], function (err, data) {
  if (err) {
     console.log(err);
  res.sendStatus(500).send('<p>Error updating Book with id='+id+' and book name:'+bookname+'to db.');
     
  } else {
      console.log(data);
      res.send(data);
     }
 });
    
})

app.listen(3000, ()=>{
    console.log('restservice_mysql app is listening on 3000');
})
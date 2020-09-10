const sql = require("./db.js");

//constructor
const Book = function(book){
    this.title = book.title,
    this.description = book.description,
    this.price = book.price
}

//create new Book
Book.create = (newBook, result) => {
    sql.query("INSERT INTO tbl_books SET ?", newBook, (err, res)=>{
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("Created a new book ", {id: res.insertId, ...newBook});
        result(null, {id: res.insertId, ...newBook});
    });
}

//find all book
Book.findAll = (result) =>{
    sql.query("SELECT * FROM tbl_books", (err, res)=>{
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("books: ", res);
        result(null, res);
    });
}

//find book by id
Book.findBookById = (bookId, result) =>{
    sql.query(`SELECT * FROM tbl_books WHERE id = ${bookId}`, (err, res)=>{
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Found book", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
}

// remove book by id
Book.remove = (bookId, result) => {
    sql.query("DELETE FROM tbl_books WHERE id=?", bookId, (err, res)=>{
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("deleted book with id: ",bookId);
        result(null, res);
    });
}

// update a book
Book.updateById = (bookId, book, result) => {
    sql.query("UPDATE tbl_books SET title = ?, description = ?, price = ? WHERE id=?",
    [book.title, book.description, book.price, bookId], (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated book: ", {id: bookId, ...book});
        result(null, {id: bookId, ...book});
    });
}

module.exports = Book;
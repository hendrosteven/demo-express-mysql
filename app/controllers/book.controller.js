const Book = require('../models/book.model.js');

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    Book.create(book, (err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        }else{
            res.send(data);
        }
    });
}

exports.findAll = (req, res) => {
    Book.findAll((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        }else{
            res.send(data);
        }
    });
}

exports.findById = (req, res) => {
    Book.findBookById(req.params.bookId, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found book with id ${req.params.bookId}.`
                });
            }else{
                res.status(500).send({
                    message: `Error retrieving book with id ${req.params.bookId}`
                });
            }
        }else{
            res.send(data);
        }
    });
}

exports.remove = (req, res) => {
    Book.remove(req.params.bookId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found book with id ${req.params.bookId}.`
                });
            }else{
                res.status(500).send({
                    message: `Could not delete Book with id ${req.params.bookId}.`
                });
            }
        }else{
            res.send(data);
        } 
    });
}

exports.update = (req, res) =>{
    if(!req.body){ 
        res.status(400).send({message: "Content can not be empty"});
    }

    Book.updateById(
        req.params.bookId,
        new Book(req.body),
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Not found book with id ${req.params.bookId}.`
                    });
                }else{
                    res.status(500).send({
                        message: `Error updating book with id ${req.params.bookId}.`
                    })
                }
            }else{
                res.send(data);
            }
        }
    );
}


//require the library
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');
//acquire the connection to check if it is successful
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console, 'error connecting to db'));
//if it is up and running print the success message
db.once('open', function(){
    console.log("Successfully connected to the database");
})
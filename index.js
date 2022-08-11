// All constant commnands
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const db = require("./config/mongoose");
const Contacts = require("./models/contact");
const app = express()

//Set Commands tells you where to look for the view layer and the middleware layer
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// the line above will look for views folder inside the parent directory
//Setting the Port
const port = 3000
//use commands to set the middleware
//Setting the body parser middleware to set the form data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// it tells express where to look for static files
app.use(express.static('assets'));
// //middleware 1 
// app.use(function(req, res, next)
// {
//   console.log("middleware 1 called");
//   next();
// })
// //middleware 2 
// app.use(function(req, res, next)
// {
//   console.log("middleware 2 called");
//   next();
// })
const contactsList = [
  {
    name:'Arpan', 
    mobile: 9876123456,
  },
  {
    name: 'Amit',
    mobile: 1234567890
  },
  {
    name: 'Ritesh',
    mobile: 2345612345
  }
]
//home route
app.get('/', (req, res) => {
  // console.log(__dirname);
  // C:\Users\lenovo\Desktop\BackEnd FullStack Development in Node js\Projects\contacts_list
  // __dirname gives route of complete path
  // res.send('Cool it is running or is it ?')
  Contacts.find({}, function(err,contacts){
    if(err){
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render('home', 
    {
      title: "My Contacts List",
      contacts_list: contacts,
      // both the things title  and contacts_list are called context variables
    });
  })
  
})
//delete contact
app.get('/delete-contact', function(req, res){
  // console.log(req.query);
  //get the id from query in ul
  let id = req.query.id;
  //find the contact in the database using id
  Contacts.findByIdAndDelete(id, function(err){
    if(err){
      console.log("error in deleting an object/contact document from database");
      return;
    }
    return res.redirect('back');
  })
  // let contactIndex = contactsList.findIndex(contact=>contact.mobile==mobile);
  // if(contactIndex!==-1){
  //   contactsList.splice(contactIndex, 1);
  // }
})
//Post Requests
app.post("/create-contact", function(req, res)
{
  // return res.redirect("/");
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.mobile);
  // contactsList.push({
  //   name: req.body.name,
  //   mobile: req.body.mobile,
  // })
  // return res.redirect("/");
  Contacts.create({
    name: req.body.name,
    mobile: req.body.mobile
  }, function(err, newContact){
    if(err){
      console.log('error in creating a contact!')
      return
    }
    // console.log("*******", newContact);
    return res.redirect('back');
  })
  // you can use back if you want to go back to a very long url

})
app.listen(port, (error)=>{
  if(error){
    console.log("error", error);
  }else{
    console.log(`Example app listening on port ${port}`)
  }
})
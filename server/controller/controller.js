var Userdb = require("../model/model");

//create and save
exports.create = (req,res) => {
if(!req.body){
    res.status(400).send({ message: "content not empty!"});
    return ;
}
const user = new Userdb({
    name:req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})

//save use in db
user
.save(user)
.then(data => {
  //  res.send(data)
  res.redirect('/add-user')
})
.catch(err => {
    res.status(500).send({
        message: err.message || "some error occured while creating a create operation"
    });
});
}
exports.find = (req,res) => {
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error occured while retriving user information"});
    })
}

//retrieve and return single user/ retrieve and return a single user
exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "Not found user with id"+ id})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error retrieving user with id"+id})
            
        })

    } else {
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information"})  
    })
}
}

exports.update =(req,res) => {
  if(!req.body){
    return res
    .status(400)
    .send({ message: "Data to update cannot be empty"})
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data => {
    if(!data) {
        res.status(404).send({message:`cannot update user with ${id}. Maybe user not found`})
    } else {
        res.send(data)
    }
    })
    .catch(err => {
        res.status(500).send({ message: "Error update user information"})
    })
}
exports.delete = (req,res) => {
   const id =req.params.id;

   Userdb.findByIdAndDelete(id)
   .then(data => {
    if(!data){
        res.status(404).send({message:`cannot delete user with ${id}. Maybe id is wrong`})
    } else {
        res.send({
            message:"User was deleted successfully!" 
        })
    }
   })
   .catch(err => {
    res.status(500).send({
        message: "Could not delete User with id=" +id
    });
   });
}

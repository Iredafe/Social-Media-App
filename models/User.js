//NOTE: this user model controls all the business logic regarding our user data


//create a userCollection variable from which you can perform db CRUD operations
const userCollection = require('../db').collection("users")

/*install validator paclkage with npm install 
validator and create a validator variable for validating users*/
const validator = require("validator")

let User = function(data){

    this.data = data
    this.errors = []
}
/*make sure the user does not pass objects or arrays into your
 database by validating only inputs of type 'string'*/

User.prototype.cleanUp = function(){
    if (typeof(this.data.username) != "string") {this.data.username = ""} 
    if (typeof(this.data.email) != "string") {this.data.email = ""} 
    if (typeof(this.data.password) != "string") {this.data.password = ""} 

//get rid of bogus properties

this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
}

}

/*create a validate function of the user object that 
will be used for user checks and validation*/

User.prototype.validate = function(){

    if (this.data.username==""){this.errors.push("You must provide a username")}
    if (this.data.username!="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Username can only contain letters and numbers")}
    
   if (!validator.isEmail(this.data.email)){this.errors.push("You must provide a valid email")}
    if (this.data.password==""){this.errors.push("You must provide a password")}
    if (this.data.password.length > 0 && this.data.password.length < 12){this.errors.push("Password must be at least 12 characters")}
    if (this.data.password.length > 100){this.errors.push("Password cannot exceed 100 characters")}
    if (this.data.username.length < 3 ){this.errors.push("Username must be at least 3 characters")}
    if (this.data.username.length > 30){this.errors.push("Username cannot exceed 30 characters")}


}

User.prototype.login = function(callback){
    this.cleanUp()
    userCollection.findOne({username: this.data.username}, (err, attemptedUser) =>{
if (attemptedUser && attemptedUser.password == this.data.password){
    callback("Congrats!!!!")
}else{
callback("Invalid username or password!")
}
    })
}



User.prototype.register = function(){

//Step #1 : Validate user data

this.cleanUp()

this.validate()
/*step #2: Only if there are no validation errors, 
then save the user  data to the database*/

if(!this.errors.length){
//in mongodb the function for creating a document is insertOne
    userCollection.insertOne(this.data)
}

}


module.exports=User
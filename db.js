const mongodb = require('mongodb')

//pass db  connection string to a constant variable
const connectionString= 'mongodb+srv://user:user100@cluster0-wvo6k.mongodb.net/socialMediaApp?retryWrites=true&w=majority'

//establish db connection
mongodb.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){

    module.exports = client.db()
    const app = require ('./app')

    //connect to server after db connection is established
    app.listen(3000)

}
)
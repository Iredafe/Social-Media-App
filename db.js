//create environment variable
const dotenv = require('dotenv')
//configure environment variable

dotenv.config() 
const mongodb = require('mongodb')


//establish db connection
mongodb.connect(process.env.CONNECTIONSTRING, 
    {useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){

    module.exports = client.db()
    const app = require ('./app')

    //connect to server after db connection is established
    app.listen(process.env.PORT)

}
)
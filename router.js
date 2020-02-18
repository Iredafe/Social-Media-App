/* the purpose of this router is to list out the urls the app
 should listen to and say what should happen for each f these routes*/

 //declare variables as const to prevent them from being changed
const express = require ('express')
const router = express.Router()
const userController = require('./controllers/userController')


router.get('/', userController.home)

//send a post request to the server 
router.post('/register', userController.register )

module.exports = router 
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    const body = request.body;
    
    if (!body.password || body.password.length < 3) {
        console.log('entered password error check')
        return response.status(400).json({
            error: 'password length too short'
        })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    //console.log('user after pwhash', user)
    try {
        const savedUser = await user.save()
        //console.log('savedUser is', savedUser)
        response.json(savedUser)
    } catch(exception) {
        next(exception)
    }

    
})

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author:1, id: 1})

    response.json(users)
})


module.exports = userRouter
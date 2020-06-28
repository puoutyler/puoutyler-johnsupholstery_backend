const express = require('express')
const router = express.Router()
const johns = require('../models/johnsupholstery.js')
const sendMail = require('../email/email.js')

router.post('/', async (req, res) => {
        const createdjohns = await johns.create(req.body)
        res.status(200).json(createdjohns)
        console.log(createdjohns)

        sendMail(createdjohns.email, createdjohns.firstName, createdjohns.lastName, createdjohns.phoneNumber, createdjohns.message, 
            function(err, data) {
            if (err){
                res.status(400).json(error)
            } else {
                res.json({message: 'Email sent'})
            }
        })
})

router.get('/', async (req, res) => {
    try{
        const getJohns = await johns.find({})
        res.status(200).json(getJohns)
    }
    catch (error){
        res.status(400).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const deletejohns = await johns.findByIdAndDelete(req.params.id)
        res.status(200).json(deletejohns)
    } catch (error){
        res.status(400).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatejohns = await johns.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatejohns)
    } catch (error){
        res.status(400).json(error)
    }
})

module.exports = router
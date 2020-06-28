const {Schema, model} = require('mongoose')

const johnsSchema = Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: String,
    message: String
})

const johns = model('johns', johnsSchema)
module.exports = johns
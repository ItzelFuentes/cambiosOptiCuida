const {model, Schema} = require ('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: false
    },
    email:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'regular'
    }
});

module.exports = model ('userReg', userSchema);

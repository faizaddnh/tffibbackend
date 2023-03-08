const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paySchema = new Schema({
    month: { type: String },
    year: { type: Number },
    point: { type: Number }
});


const loanSchema = new Schema({
    month: { type: String },
    year: { type: Number },
    amount: { type: Number }
});


const loanpaySchema = new Schema({
    month: { type: String },
    year: { type: Number },
    emi: { type: Number }
})


const userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        payment: [paySchema],
        loan: [loanSchema],
        loanpay: [loanpaySchema]
    }
);

const user = mongoose.model('user', userSchema);
module.exports = user;
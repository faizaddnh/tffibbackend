const express = require('express');
const user = require('../model/UserModel');

const userRouter = express.Router();


userRouter.get('/', function (req, res) {
    user.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });

});

userRouter.post(
    "/signin",
    async (req, res) => {
        const User = await user.findOne({ email: req.body.email });
        if (User) {

            res.send({
                _id: User._id,
                name: User.name,
                email: User.email,
                payment: User.payment
            });
            return;

        }
        res.status(401).send({ message: "Invalid email or password" });
    }
);


userRouter.post('/signup', function (req, res) {
    var mod = new user(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: 'NAME ADDED' });
        }
    });

});





userRouter.post('/:id/payment', async (req, res) => {
    const userId = req.params.id;
    const userpay = await user.findByIdAndUpdate(userId);
    const pay = {
        month: req.body.month,
        year: req.body.year,
        point: req.body.point,
    };
    userpay.payment.push(pay);
    const updateduser = await userpay.save();
});


userRouter.post('/:id/loan', async (req, res) => {
    const userId = req.params.id;
    const userloan = await user.findByIdAndUpdate(userId);
    const loan = {
        month: req.body.month,
        year: req.body.year,
        amount: req.body.amount,
    };
    userloan.loan.push(loan);
    const updateduser = await userloan.save();
});


userRouter.post('/:id/loanpay', async (req, res) => {
    const userId = req.params.id;
    const userloanpay = await user.findByIdAndUpdate(userId);
    const Loanpay = {
        month: req.body.month,
        year: req.body.year,
        emi: req.body.emi,
    };
    userloanpay.loanpay.push(Loanpay);
    const updateduser = await userloanpay.save();
});










userRouter.put('/:id', async (req, res) => {
    try {
        const updateUser = await user.findByIdAndUpdate(req.params.id, req.body);
        res.json(updateUser);
        console.log('USER updated')
    }
    catch (err) {
        rs.json(err);
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await user.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');

    }
    catch (err) {
        res.json(err);
    }
});

module.exports = userRouter;
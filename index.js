const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoute');
const port = 5050;




const app = express();

dotenv.config();



app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use('/api/users', userRouter);




mongoose.connect(process.env.MONGODB_URI).then(() => {
    try {
        console.log('Database Connected')
    } catch (err) {
        console.log(err.message);
    };
});



app.listen(port, () => {
    console.log('server running on poryt 5050 ');
});



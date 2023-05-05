const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const purchase = require('./routes/purchase');
const transactionRoute = require('./routes/transactionRoute');
const userCardRoute = require('./routes/userCardRoute');
const rewardRoute = require('./routes/rewardRoute');
const dotenv = require('dotenv');
require("./db/conn");
dotenv.config({ path: './config.env' })
const app = express();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api', transactionRoute);
app.use('/api', purchase);
app.use('/api', userCardRoute);
app.use('/api', rewardRoute);
//app.use(purchase);



app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});
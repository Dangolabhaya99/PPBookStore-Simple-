const connectDB = require("./src/Config/db");
const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
connectDB();

app.use(express.json());
app.use(cors());

const bookRoute=require("./src/Routes/BookRoute");
const authRoute=require("./src/Routes/AuthRoute");

const profileRoutes = require("./src/Routes/profileRoute");
const userProfileRoutes = require("./src/Routes/userProfleRoute");

const orderRoutes=require('./src/Routes/OrderRoute')
const publicationRoutes=require("./src/Routes/PublicationRoute");
const paymentRoutes=require("./src/Routes/PaymentRoute");
const cartRoutes = require('./src/Routes/CartRoute');

app.use('/api/book',bookRoute)
app.use('/api/auth',authRoute)

app.use("/user", userProfileRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use('/api/profile', profileRoutes);

app.use('/api/order',orderRoutes)
app.use('/api/publication',publicationRoutes)
app.use('/api/payment',paymentRoutes)

app.use('/api', cartRoutes);

app.listen(port, ()=>{
    console.log(`server is runnigng on ${port}`);
});
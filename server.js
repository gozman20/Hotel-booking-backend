const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
//Initialise express
const app = express();
app.use(credentials);
app.use(cors(corsOptions));
// to be able to get body data from the frontend, this 2 line of code below has to be added
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/goals',require('./routes/goalroutes'))
app.use("/hotels", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));

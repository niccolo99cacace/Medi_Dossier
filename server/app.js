const express = require("express");
require("express-async-errors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");

require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");


const app = express();
app.use(express.json());
app.use(morgan("dev"));
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});



app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
//store per sapere dove è salvata la sessione(sopra abbiamo la var store)
    store: store,
   
  })
);






    

app.use("/api/user", userRouter);


app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});

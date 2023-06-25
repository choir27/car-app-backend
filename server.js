const express = require("express");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const connectDB = require("./config/database");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const apptRoutes = require("./routes/appt");
const apiRoutes = require("./routes/api");
require("dotenv").config();

require("./config/passport")(passport);

//Connect To Database
connectDB();

app.use(cors());

app.use(cors({
  origin: [process.env.API_PORT_URL],
  methods: "GET, POST, PUT, DELETE, OPTIONS"
}));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUnitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI
  })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Setup Routes For Which The Server Is Listening
app.use("/", apptRoutes);
app.use("/api", apiRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
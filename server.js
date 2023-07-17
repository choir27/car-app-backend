const express = require("express");
const app = express();
const cors = require("cors");
const clientRoutes = require("./routes/client")
require("dotenv").config();

app.use(cors());

app.use(cors({
  origin: [process.env.API_PORT_URL],
  methods: "GET, POST, PUT, DELETE, OPTIONS"
}));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup Routes For Which The Server Is Listening
app.use("/", clientRoutes);

const request = require('request');

var model = 'camry'
request.get({
  url: 'https://api.api-ninjas.com/v1/cars?model=' + model,
  headers: {
    'X-Api-Key': 'KOUitVxkgDY2oBACStsPNqBS3tD06TAQ6g4tFwAg'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
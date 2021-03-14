const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const NodeMediaServer = require('node-media-server');



// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose



mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/users", require("./routes/userRouter"));


app.get('/', (req,res) => {
  res.send('Hello to auth API')
});

const config = {
  logType: 3,

  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
};

var nms = new NodeMediaServer(config);
nms.run();


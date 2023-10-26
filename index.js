require("dotenv").config();

const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const morgan = require("morgan");
const productRouter = require("./router/router");
const userRouter = require("./router/user");

// const { log } = require('console');
// const productRouter=require('./router/router')

//|---------------------------------------------|
//|      Atlas admin Password :   o8EdITkqjofQixDa    |
//|  Atlas database password : mGDAdNO6qfCnWIIV  |
//|---------------------------------------------|

console.log("env", process.env.DB_PASSWORD);

//db connectin code
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

//Schema

// =====Body Parser========
server.use(cors());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// server.use('/api/v1',productRouter.router);

// ======MVC Model-View-Contrller=========

server.listen(process.env.PORT, () => {
  console.log("server started");
});

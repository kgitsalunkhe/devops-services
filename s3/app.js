//provides stronger error checking and more secure code
"use strict";

// web server framework for Node.js applications
const express = require("express");
// allows requests from web pages hosted on other domains
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fileName = "app.js";

const { HttpException } = require("./HttpException.utils");

const app = express();
const port = 8083;

// Parses incoming JSON requests
app.use(express.json());
app.use(cors());

/** add reqId to api call */
app.use(function (req, res, next) {
  res.locals.reqId = uuidv4();
  next();
});

app.post("/add-sub", (req, res) => {
  const {a=0, b=0} = req.body;
  console.log(`A: ${a}, B: ${b}`);

  var request = require('request');
  var sum1 = 0;
  request.post(
      'http://localhost:8081/add',
      { json: { 'a':a,'b':b } },
      function (error, response, body) {
        sum1 = body.body.sum;
        res.status(200).send({
          body: {
            sum: sum1
          }
        });
      }
  );

});

/** 404 error */
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Koustubh");
  return res.status(err.status).send(err.message);
});

app.listen(port, () => {
  console.log("Start", fileName, `S3 App listening at http://localhost:${port}`);
});

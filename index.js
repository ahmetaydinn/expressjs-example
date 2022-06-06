const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const app = express();
const port = 3000;
console.log(process.env)
const userName= process.env.USER_NAME
const password= process.env.PASSWORD

const connectionString = `mongodb+srv://${userName}:${password}@cluster0.jwfwk.mongodb.net/?retryWrites=true&w=majority`
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("***connected to database***");
    const db = client.db("star-wars-quotes");

    const quotesCollection = db.collection("quotes");

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
            res.redirect('/')
        })
        .catch((error) => console.error(error));
    });

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            console.log(results)
          })
          .catch(error => console.error(error))
        // ...
      })


  })
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
require("dotenv");

import Cards from "./dbCards.js";
import dbCards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.CONNECTION_URL;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB"),
);

// API Endpoints

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Hello World"));
// Listener
app.listen(port, () => console.log(`listening on port ${port}`));

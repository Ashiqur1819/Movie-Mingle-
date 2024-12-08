const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.zt90y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("MoviesDB");
    const movieCollection = database.collection("movies");
    const favouriteCollection = database.collection("favourites");
    const userCollection = database.collection("users");
    const contactCollection = database.collection("contactUsers");

    // API's for all movies
    // app.get("/", async (req, res) => {
    //   const cursor = movieCollection.find({});
    //   const result = await cursor.limit(6).toArray();
    //   res.send(result);
    // });

    app.get("/movies", async (req, res) => {
      const cursor = movieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.findOne(query);
      res.send(result);
    });

    app.post("/movies", async (req, res) => {
      const newMovie = req.body;
      const result = await movieCollection.insertOne(newMovie);
      res.send(result);
    });

    app.put("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const movie = req.body;
      const updatedMovie = {
        $set: {
          poster: movie.poster,
          title: movie.title,
          genre: movie.genre,
          duration: movie.duration,
          year: movie.year,
          rating: movie.rating,
          summery: movie.summery,
        },
      };
      const result = await movieCollection.updateOne(
        filter,
        updatedMovie,
        options
      );
      res.send(result);
    });

    app.delete("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.deleteOne(query);
      res.send(result);
    });

    // API's for favourite movies

    app.get("/favourites", async (req, res) => {
      const cursor = favouriteCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/favourites/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favouriteCollection.findOne(query);
      res.send(result);
    });

    app.post("/favourites", async (req, res) => {
      const favouriteMovie = req.body;
      const result = await favouriteCollection.insertOne(favouriteMovie);
      res.send(result);
    });

    app.delete("/favourites/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favouriteCollection.deleteOne(query);
      res.send(result);
    });

    // API's for users
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.patch("/users", async (req, res) => {
      const email = req.body.email;
      const filter = { email };
      const updatedUser = {
        $set: {
          lastSignInTime: req.body?.lastSignInTime,
        },
      };

      const result = await userCollection.updateOne(filter, updatedUser);
      res.send(result);
    });

    // API's for contact users
    app.get("/contact_users", async (req, res) => {
      const cursor = contactCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/contact_users", async (req, res) => {
      const user = req.body;
      const result = await contactCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Movies server running successfully");
});

app.listen(port, () => {
  console.log("This server running on port:", port);
});

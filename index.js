const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json())


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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    const database = client.db("MoviesDB");
    const movieCollection = database.collection("movies");
    const favouriteCollection = database.collection("favourites");
    const userCollection = database.collection("users")

// API's for all movies
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
            const query = { _id:  id};
            const result = await favouriteCollection.findOne(query);
            console.log(result);
            res.send(result);
          });

    app.post("/favourites", async (req, res) => {
      const favouriteMovie = req.body;
      const result = await favouriteCollection.insertOne(favouriteMovie);
      res.send(result);
    });

        app.delete("/favourites/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: id };
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



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Movies server running successfully");
})

app.listen(port, () => {
    console.log("This server running on port:", port)
})
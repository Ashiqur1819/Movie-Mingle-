const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Movies server running successfully");
})

app.listen(port, () => {
    console.log("This server running on port:", port)
})
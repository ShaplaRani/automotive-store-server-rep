const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

//automotive
// akZbAGGrtB2sHGSp


const uri = "mongodb+srv://automotive:akZbAGGrtB2sHGSp@cluster0.ei0qpxt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const automotiveCollection = client.db("automotiveDB").collection("automotive")
    //data read 
    app.get("/automotive", async(req, res)=> {
        const cursor = automotiveCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })
     //create a product
     app.post('/automotive' , async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await automotiveCollection.insertOne(newProduct);
        res.send(result);
      })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("automotive server is running")
})

app.listen(port, () => {
    console.log(`automotive server is running on port:${port}`)
})
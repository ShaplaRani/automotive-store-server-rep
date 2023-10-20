const express = require('express');
// const cors = require('cors');
import 'dotenv/config'
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

//automotive
// akZbAGGrtB2sHGSp

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

const uri = "mongodb+srv://automotive:akZbAGGrtB2sHGSp@cluster0.ei0qpxt.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://automotive:akZbAGGrtB2sHGSp@cluster0.ei0qpxt.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
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

    //  await client.connect();
    const automotiveCollection = client.db("automotiveDB").collection("automotive")
    const cartCollection = client.db("automotiveDB").collection("cart")
    //data read 
    app.get("/automotive", async(req, res)=> { 
        const cursor = automotiveCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })
    // single data read
    app.get("/automotive/:id", async(req, res)=>{
        const id = req.params.id;
        const query= {_id: new ObjectId(id)}
        console.log(query);
        const result = await automotiveCollection.findOne(query)
        console.log(result);
        res.send(result)

    })
     //create a product
     app.post('/automotive' , async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await automotiveCollection.insertOne(newProduct);
        res.send(result);
      })

      //update
      app.put('/automotive/:id', async(req,res) => {
        const id =  req.params.id;
        const product = req.body;
        const filter= {_id: new ObjectId(id)}
        const option = {upsert: true}
        const updateProduct = {
         $set: {
           photo: product.photo,
           name:product.name,
           brand:product.brand,
           type:product.type,
           price:product.price,
           description:product.description,
           rating:product.rating,
           
         }
        }
        const result = await automotiveCollection.updateOne(filter, updateProduct, option)
        res.send(result)
       }) 

      //cart related api

      app.get("/cart", async(req, res)=> {
        const cursor = cartCollection.find();
        const result = await cursor.toArray()
        res.send(result)
      })

    
      


      app.post('/cart' , async(req, res) => {
        const newCart = req.body;
        console.log(newCart);
        const result = await cartCollection.insertOne(newCart);
        res.send(result);
      })

      app.delete('/cart/:id' ,  async (req, res) => {
        const id = req.params.id;
        console.log('delete', id);
        const query = {_id: id}
        console.log(query);
        const result = await cartCollection.deleteOne(query);
        console.log(result);
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
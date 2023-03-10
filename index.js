const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjh2ngr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const dishesCollection = client.db('restaurant-project').collection('dishes');
    const commentsCollection = client.db('restaurant-project').collection('comments');
    app.get('/dishes', async (req, res) => {
      const query = {};
      const result = await dishesCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/comments', async (req, res) => {
      const query = {};
      const result = await commentsCollection.find(query).toArray();
      res.send(result)
    })

  }
  finally {

  }
}
run().catch(e => console.error(e))

app.get('/', (req, res) => {
  res.send('Restaurant server is running');
})

app.listen(port, () => {
  console.log(`Restaurant server on ${port}`)
})
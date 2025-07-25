// これがないと .env が読み込まれません！
require('dotenv').config();

const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.get('/', async function (req, res, next) {
  try {
    await client.connect();
    const database = client.db('test'); // ←DB名が正しいか確認！
    const notes = database.collection('notes_from_b');
    const allNotes = await notes.find({}).toArray();
    res.json(allNotes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to database');
  } finally {
    await client.close();
  }
});

module.exports = router;

/*
const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

let database

async function connectDB() {
    await client.connect()
    database = client.db("myDatabase") // change if needed
    console.log("MongoDB Connected")
}

function getCollection(name) {
    if (!database) {
        throw new Error("Database not initialized")
    }
    return database.collection(name)
}

module.exports = {
    connectDB,
    getCollection
}
*/
const { MongoClient } = require("mongodb");
// Add this line to load the .env file
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let database;

async function connectDB() {
    try {
        await client.connect();
        // Make sure "myDatabase" matches your MongoDB Atlas setup
        database = client.db("myDatabase");
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

function getCollection(name) {
    if (!database) {
        throw new Error("Database not initialized");
    }
    return database.collection(name);
}

module.exports = {
    connectDB,
    getCollection
};
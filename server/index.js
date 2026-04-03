require("dotenv").config();
const express = require("express");
const { connectDB } = require("./models/index.js");
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async() => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();
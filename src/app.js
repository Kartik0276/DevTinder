const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from home");
});

app.get("/hello", (req, res) => {
    res.send("Hello from hello");
});

app.get("/test", (req, res) => {
    res.send("Hello from test");
});

app.get("/kartik", (req, res) => {
    res.send("Hello from Kartik");
});

const PORT = 7777;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`);
})
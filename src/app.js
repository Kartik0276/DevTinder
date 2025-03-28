const express = require('express');

const app = express();


// app.use("/user", (req, res) => {
//     res.send("HAHAHAHAHAHAHAHA....");
// })

app.get("/user/:name/:password", (req, res) => {
    //console.log(req.query);
    console.log(req.params);
    res.send({
        "FirstName" : "Kartik",
        "LastName" : "Maity"
    });
})

app.post("/user", (req, res) => {
    //post data
    res.send("Data is posted successfully!");
});

app.delete("/user", (req, res) => {
    //delete data
    res.send("The data is successfully deleted");
})

const PORT = 7777;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`);
})
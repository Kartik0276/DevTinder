const express = require('express');

const app = express();


// app.use("/user", (req, res) => {
//     res.send("HAHAHAHAHAHAHAHA....");
// })

app.use("/user",
    (req, res, next) => {
        res.send("This is from first");
        //next();
    },
    (req, res, next) => {
        res.send("This is from second");
    }
)



const PORT = 7777;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`);
})
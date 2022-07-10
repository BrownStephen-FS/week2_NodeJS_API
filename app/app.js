const express = require("express");
const todosRouter = require("../router/todosRouter");

const app = express();
//http://localhost:3000
app.get("/", (req, res, next) => {
    res.status(200).json({message: "Service is up"});
});

//router middleware
app.use("/todos", todosRouter);

//adding middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        status: err.status,
        method: req.method,
    })
});

module.exports = app;
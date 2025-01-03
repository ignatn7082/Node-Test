const express = require("express");
const cors = require("cors");

const app = express();

const contactsRouter = require("./app/routes/contact.route");

const ApiError = require("./app/api-error");


app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Not found"));
});

//define error-handing middleware last
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });        
});

app.get("/",(req, res) => {
    res.json({ message: "Welcome to contact book applocation."});
});

module.exports = app;
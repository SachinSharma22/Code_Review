import express from "express";

const app = express();

app.get("/", (req,res) => {
    res.send("Maar ke kha jaao part 2");
});


export default app;
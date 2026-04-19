import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Maar ke kha jaao part 2");
});

app.use("/ai", aiRoutes);


export default app;
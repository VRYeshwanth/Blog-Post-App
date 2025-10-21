import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on PORT ${process.env.PORT}`);
})
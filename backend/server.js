import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(console.log("❌ Error connecting to database"));

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on PORT ${process.env.PORT}`);
})
import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

const app = express();
app.use(express.json());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("DB OK 🔥"))
    .catch((err) => console.error("DB ERR:", err));

app.get("/", async (req, res) => {
    try {
        const result = await client.query("SELECT NOW()");
        res.send("Server işdədir → " + result.rows[0].now);
    } catch (error) {
        res.send("DB hata → " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server port ${PORT}-da işləyir 🚀`);
});

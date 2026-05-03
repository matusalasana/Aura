import { connectDB } from "./core/database/db"
import { PORT } from "./core/config/env"
import express from "express"


const app = express()

app.listen(PORT, async () => {
  console.log("Server is listening on port", PORT)
  await connectDB();
})
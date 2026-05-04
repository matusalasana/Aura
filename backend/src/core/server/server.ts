import { connectDB } from "../database/db"
import { connectRedis } from "../cache/redis"
import { PORT } from "../config/env"
import { app } from "./app"


app.listen(PORT, async () => {
  console.log("Server is listening on port", PORT)
  await connectDB();
  await connectRedis()
})
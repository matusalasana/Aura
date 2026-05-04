import express from "express"
import cors from "cors"
import helmet from "helmet"

import routes from "../../routes";


export const app = express();

app.use("/api/v1", routes);

app.use(cors());
app.use(helmet());
app.use(express.json());
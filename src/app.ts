/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, {Request, Response} from "express";
import cors from "cors";
import {globalErrorHandler} from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ["http://localhost:3000"]}));

// application routes
app.use("/api/v1", router);

const server = async (req: Request, res: Response) => {
  res.send("🕊 SERVER ONGOING ~");
};

app.get("/", server);
app.use(notFound);
app.use(globalErrorHandler);

export default app;

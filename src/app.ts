import express, {Request, Response} from "express";
import cors from "cors";
import {globalErrorHandler} from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const server = (req: Request, res: Response) => {
  res.send("Yes ✔ Akhi - Server Active");
};

app.get("/", server);
app.use(globalErrorHandler);
app.use(notFound);

export default app;

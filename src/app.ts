import express, {Request, Response} from "express";
import cors from "cors";
import {StudentRoutes} from "./app/modules/student/student.route";
import {UserRoutes} from "./app/modules/user/user.route";
import {globalErrorHandler} from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Yes ✔ Akhi - Server Active");
};

app.get("/", getAController);
app.use(globalErrorHandler);
app.use(notFound);

export default app;

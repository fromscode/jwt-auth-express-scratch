import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/../views");

app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(notFound);
app.use(errorHandler);
const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server up and running at port ${PORT}`);
});

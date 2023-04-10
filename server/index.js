import express from "express";
import { userRouter } from "./user/routes.js";
import { productRouter } from "./product/routes.js";
import cors from "cors";

const app = express();
const port = process.env.NEXT_PUBLIC_DOMAIN_API_PORT || 3000;

console.log(port);

app.use(cors());

app.get("/api/hello", (req, res) => {
  res.send({ status: "Hello From Express" });
});

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));


import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OPD Token Engine running" });
});

export default app;


import express from "express";
import tokenRoutes from "./routes/token.routes.js";
import slotRoutes from "./routes/slot.routes.js";
import delayRoutes from "./routes/delay.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OPD Token Engine running" });
});


app.use("/api/tokens", tokenRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/delay", delayRoutes);

export default app;

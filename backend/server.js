const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");
const apikeyRoutes = require("./routes/apikeys");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend
    credentials: true, // Habilita cookies
  })
);
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/apikeys", apikeyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

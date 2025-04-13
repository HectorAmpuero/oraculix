require("dotenv").config();
console.log("OpenAI Key cargada:", process.env.OPENAI_API_KEY);
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const mercadopago = require("mercadopago");
const lecturaRoutes = require("./routes/lectura.routes");
const openAIRoutes = require("./routes/openai.routes");
const interpretacionRoutes = require("./routes/interpretacion.routes");
const pagoRoutes = require("./routes/pago.routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/api", (req, res) => {
  res.send("Servidor backend de Oraculix funcionando 🚀");
});

// Rutas API
app.use("/api/lectura", lecturaRoutes);
app.use("/api/openai", openAIRoutes);
app.use("/api/interpretacion", interpretacionRoutes);
app.use("/api/pago", pagoRoutes);

// ==== Producción: Servir frontend desde dist ====
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
// =================================================


// Servir frontend en producción

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});

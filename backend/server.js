require("dotenv").config();
const express = require("express");
const mercadopago = require("mercadopago"); // Asegúrate que esté
const cors = require("cors");
const morgan = require("morgan");
const lecturaRoutes = require("./routes/lectura.routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend de Oraculix funcionando 🚀");
});

// Rutas de Lectura numerológica
app.use("/api/lectura", lecturaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});

const openAIRoutes = require("./routes/openai.routes");
app.use("/api/openai", openAIRoutes);

const interpretacionRoutes = require("./routes/interpretacion.routes");
app.use("/api/interpretacion", interpretacionRoutes);


const pagoRoutes = require("./routes/pago.routes");
app.use("/api/pago", pagoRoutes);
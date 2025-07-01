const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const apikeyRoutes = require('./routes/apikeys');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/apikeys', apikeyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

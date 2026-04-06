// 1. Load modul Path (bawaan Node.js) untuk mengatur alamat folder
const path = require('path');

// 2. Load Dotenv dengan 'Path Spesifik' agar bisa membaca file .env di luar folder server
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const app = express();

// 3. Ambil PORT dari .env, jika tidak ada pakai 3000
const PORT = process.env.PORT || 3000;

// 4. Middleware (Satpam & Penerjemah)
app.use(cors());            // Izin akses untuk Frontend (CORS)
app.use(express.json());    // Penerjemah data JSON dari request body

// 5. Daftarkan Route API (Papan Penunjuk Jalan)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// 6. Test Route Utama
app.get('/', (req, res) => {
    res.send('Pos 1 Engine Already On, Ready To Race!');
});

// 7. Nyalakan Mesin
app.listen(PORT, () => {
    console.log(`[OK] Server Running On http://localhost:${PORT}`);
    console.log(`[OK] DB_USER yang terbaca: ${process.env.DB_USER}`); // Cek apakah .env terbaca
});
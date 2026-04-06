const db = require('../config/db');

// Fungsi untuk mengambil semua daftar produk
const getAllProducts = async (req, res) => {
    try {
        // [rows] adalah cara kita mengambil hasil query (data tabel)
        const [rows] = await db.execute('SELECT * FROM products');
        
        // Kirim data ke browser/frontend dalam bentuk JSON
        res.status(200).json(rows);
    } catch (error) {
        // Kalau database mati atau query salah, tampilkan error di terminal
        console.error("Error SQL:", error);
        res.status(500).json({ message: 'Gagal mengambil data produk' });
    }
};

module.exports = { getAllProducts };
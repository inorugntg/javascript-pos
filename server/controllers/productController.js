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

const checkout = async (req, res) => {
    const { items } = req.body; // Menerima daftar belanjaan dari frontend
    try {
        // Kita gunakan loop untuk update stok satu per satu
        for (const item of items) {
            await db.execute(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.id]
            );
        }
        res.status(200).json({ message: 'Transaksi Berhasil, Stok Terupdate!' });
    } catch (error) {
        console.error("Error Checkout:", error);
        res.status(500).json({ message: 'Gagal memproses transaksi' });
    }
};

// Update export-nya juga!
module.exports = { getAllProducts, checkout };
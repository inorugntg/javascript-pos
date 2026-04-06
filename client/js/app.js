document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');
    const itemCount = document.getElementById('item-count');

    // Ambil data dari Backend (lewat api.js)
    const products = await fetchProducts();

    if (products && products.length > 0) {
        itemCount.innerText = `${products.length} Produk`;
        
        // Bersihkan teks "Memuat..."
        productGrid.innerHTML = '';

        products.forEach(product => {
            const card = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <span class="badge bg-info mb-2">${product.category}</span>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="text-primary fw-bold">Rp ${Number(product.price).toLocaleString('id-ID')}</p>
                            <p class="small text-muted">Stok: ${product.stock}</p>
                            <button class="btn btn-outline-primary btn-sm w-100" 
                                    onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                                + Tambah ke Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productGrid.innerHTML += card;
        });
    } else {
        productGrid.innerHTML = '<p class="text-center">Gagal memuat produk. Cek koneksi server!</p>';
    }
});

let cart = [];

// Fungsi Dummy untuk Cart (Nanti kita detailkan)
function addToCart(id, name, price) {
    //cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === id);

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({id,name,price:Number(price), quantity:1});
    }
    renderCart(); //perbarui tampilan keranjang
}

// fungsi untuk nampilin isi keranjang ke HTML
function renderCart(){
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total'); // GANTI INI
    const btnCheckout = document.getElementById('btn-checkout'); // GANTI INI

    if(cart.length === 0){
        cartItems.innerHTML = '<p class="text-muted text-center">Keranjang masih kosong</p>';
        cartTotal.innerText = 'Rp 0'; // Gunakan innerText untuk angka
        btnCheckout.disabled = true;
        return; 
    }

    // ... sisa kode render map ...
    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between mb-2">
            <span>${item.name} (x${item.quantity})</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
    btnCheckout.disabled = false;
}
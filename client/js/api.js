const API_URL = 'http://localhost:3060/api';

//untuk mengambil data produk dari backend
async function fetchProducts(){
    try {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    } catch (error) {
        console.error("failed to pick up data", error);
    }
}
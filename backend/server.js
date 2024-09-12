const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data produk simulasi
let products = [
  { id: 1, name: 'baju', price: 10000, description: 'hitam' },
  { id: 2, name: 'kaos', price: 20000, description: 'hitam' },
  { id: 3, name: 'celana', price: 30000, description: 'hitam' },
];

// GET /api/products - Mengembalikan daftar semua produk
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Mengembalikan detail produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  res.json(product);
});

// POST /api/products - Menambahkan produk baru
app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;

  // Validasi input
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Nama, harga, dan deskripsi diperlukan' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Memperbarui produk berdasarkan ID
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, description } = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  // Validasi input
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Nama, harga, dan deskripsi diperlukan' });
  }

  products[productIndex] = { id: productId, name, price, description };
  res.json(products[productIndex]);
});

// DELETE /api/products/:id - Menghapus produk berdasarkan ID
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Produk berhasil dihapus' });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

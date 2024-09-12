import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, Heading, Button, SimpleGrid, Box, Text, Link } from '@chakra-ui/react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sortProducts();
  }, [sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h2" size="xl">Daftar Produk</Heading>
      <Button onClick={toggleSortOrder} colorScheme="red">
        Urutkan berdasarkan Harga ({sortOrder === 'asc' ? 'Rendah ke Tinggi' : 'Tinggi ke Rendah'})
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" p={4} shadow="md">
            <VStack align="stretch" spacing={3}>
              <Heading as="h3" size="md">{product.name}</Heading>
              <Text fontWeight="bold" color="grey.500">Harga: Rp{product.price.toLocaleString()}</Text>
              <Text>{product.description}</Text>
              <Link as={RouterLink} to={`/products/${product.id}`}>
                <Button colorScheme="grey" variant="outline" width="full">Detail Produk</Button>
              </Link>
              <Button onClick={() => addToCart(product)} colorScheme="red" width="full">Tambah ke Keranjang</Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ProductList;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { useCart } from '../context/CartContext';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
  Skeleton,
  useToast
} from '@chakra-ui/react';

const API_URL = 'http://localhost:5000/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Gagal mengambil detail produk. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Produk ditambahkan',
      description: `${product.name} telah ditambahkan ke keranjang.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="200px" />
          <Skeleton height="40px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={8}>
        <Box p={4} borderRadius="md" bg="red.100" color="red.700">
          {error}
        </Box>
      </Container>
    );
  }

  if (!product.name) {
    return (
      <Container maxW="container.md" py={8}>
        <Box p={4} borderRadius="md" bg="yellow.100" color="yellow.700">
          Produk tidak ditemukan
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Image
          src={product.image || 'https://via.placeholder.com/400x300?text=Produk'}
          alt={product.name}
          borderRadius="md"
          objectFit="cover"
          maxH="400px"
          w="100%"
        />
        <Heading as="h2" size="xl">{product.name}</Heading>
        <HStack justify="space-between">
          <Badge colorScheme="green" fontSize="lg" p={2}>
            Rp{product.price.toLocaleString()}
          </Badge>
          <Badge colorScheme="grey" fontSize="md" p={2}>
            Stok: {product.stock || 'Tersedia'}
          </Badge>
        </HStack>
        <Text fontSize="lg">{product.description}</Text>
        <Button
          onClick={handleAddToCart}
          colorScheme="grey"
          size="lg"
          leftIcon={<span role="img" aria-label="cart">🛒</span>}
        >
          Tambahkan ke Keranjang
        </Button>
      </VStack>
    </Container>
  );
};

export default ProductDetail;
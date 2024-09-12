import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { VStack, Heading, Text, Button, Image, Box, SimpleGrid, Center, Slide } from '@chakra-ui/react';

const Home = () => {
  return (
    <VStack spacing={8} align="stretch" bg="#F7F8FA" color="#2B2D42" p={4}>
      <Center>
        <Slide direction="bottom" in={true} style={{ transitionDelay: '0.5s' }}>
          <Image src="" alt="Toko Online Kami" mb={4} borderRadius="8px" boxShadow="0 0 15px rgba(0,0,0,9.15)" />
        </Slide>
        <Heading as="h2" size="2xl" mb={4} fontFamily="Segoe UI, sans-serif">Selamat Datang</Heading>
      </Center>
    </VStack>
  );
};

const Feature = ({ icon, title, text }) => {
  return (
    <VStack spacing={4} align="center" bg="#fff" borderRadius="8px" boxShadow="0 0 15px rgba(0,0,0,0.15)" p={4}>
      <Box fontSize="5xl" mb={4}>{icon}</Box>
      <Text fontWeight="bold" fontSize="xl" mb={2} fontFamily="Segoe UI, sans-serif">{title}</Text>
      <Text textAlign="center" fontFamily="Segoe UI, sans-serif">{text}</Text>
    </VStack>
  );
};

export default Home;
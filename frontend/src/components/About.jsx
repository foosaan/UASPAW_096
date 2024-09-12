import React from 'react';
import { VStack, Heading, Text, Box, SimpleGrid, Image } from '@chakra-ui/react';
const About = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading as="h2" size="2xl" mb={4}>Tentang Kami</Heading>
        <Text fontSize="xl">Kami adalah toko online yang terpercaya dan berkomitmen untuk menyediakan berbagai produk dengan kualitas terbaik.</Text>
      </Box>
    </VStack>
  );
};


export default About;
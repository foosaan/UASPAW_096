import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const Products = () => {
  return (
    <div>
      <ProductList />
      <Cart width="300px" position="sticky" top="20px" alignSelf="flex-start"/>
      
    </div>
    
  );
};



export default Products;
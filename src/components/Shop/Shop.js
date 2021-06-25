import React from 'react';
import  { useState } from 'react';
import fakeData from'../../fakeData'
import './Shop.css'
import Product from'../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [Products, setProducts] = useState(first10);
     const [cart, setCard] = useState([]);

     
    function handleAddProduct(product){
      const newcard=[...cart,product];
      setCard(newcard);
    }

    return (
        <div className="Shop-container">
         <div className="product-container">
         {
         Products.map(pd =><Product 
        handleAddProduct={handleAddProduct}     
        product={pd}></Product> )
         }
        </div>  
  
       <div className="Card-container">
        <Cart cart={cart}></Cart>
       </div>

        </div>
    );
};

export default Shop;
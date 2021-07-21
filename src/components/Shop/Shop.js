import React, { useEffect } from 'react';
import  { useState } from 'react';
import fakeData from'../../fakeData'
import './Shop.css'
import Product from'../Product/Product';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [Products, setProducts] = useState(first10);
     const [cart, setCard] = useState([]);



    
   useEffect(() => {
   const saveCart=getDatabaseCart();
   const productKeys=Object.keys(saveCart);

   const previousCart=productKeys.map(existingkey =>{
       const product=fakeData.find(pd=>pd.key === existingkey);
       product.quantity= saveCart[existingkey];
       return product;
   })
   setCard(previousCart);
 }, [])



     
    function handleAddProduct(product){
      const toBeAddekey=product.key;
      const sameProduct =cart.find(pd=>pd.key === toBeAddekey);
      let count=1;
      let newcard;
      if(sameProduct){
      count=sameProduct.quantity+1;
      sameProduct.quantity=count;
      const other=cart.filter(pd=>pd.key !== toBeAddekey);
      newcard=[...other,sameProduct];
      }


      else{
        product.quantity=1;
        newcard=[...cart,product];
      }

      setCard(newcard);
      addToDatabaseCart(product.key,count);
    }

    return (
        <div className="twin-container">
         <div className="product-container">
         {
         Products.map(pd =><Product 
          key={pd.key}
          showAddToCart={true}
        handleAddProduct={handleAddProduct}     
        product={pd}></Product> )
         }
        </div>  
  
       <div className="Card-container">
       <Cart cart={cart}>
       <Link to="/review">
            <button className="main-button">Review Order</button>
            </Link>
       </Cart>
       </div>

        </div>
    );
};

export default Shop;
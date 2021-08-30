import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    // const first10=fakeData.slice(0,10);
    const [Products, setProducts] = useState([]);
    const [cart, setCard] = useState([]);
     const [search, setSearch]=useState('');
    useEffect(() => {
   fetch('http://localhost:5000/products?search='+search)
   .then(res=>res.json())
   .then(data=>setProducts(data))
    }, [search])

    
   //cart 
   useEffect(() => {
   const saveCart=getDatabaseCart();
   const productKeys=Object.keys(saveCart);
   fetch('http://localhost:5000/productByKeys',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(productKeys)
})
.then(res=>res.json())
.then(data=> setCard(data))
 }, [])


const handleSearch=event => {
  setSearch(event.target.value);
  console.log(event.target.value)
}
     
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
          Products.length ===0&& <h3>Loading.........</h3>
        }
        <input type="text" onChange={handleSearch} className="product-search" placeholder="Search" />


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
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import happyimg from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import './Review.css';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderplaced,serOrderplaced]=useState(false);
    const history=useHistory();

    const handleProceedCheckout=()=>{
        history.push('/shipment');
    }

  const removeProduct =(productkey) => {
      const newcard=cart.filter(pd=>pd.key !==productkey);
      setCart(newcard);
      removeFromDatabaseCart(productkey);
  }


    useEffect (() => {
         //cart
      const saveCart=getDatabaseCart();
      const productKeys=Object.keys(saveCart);

     fetch('http://localhost:5000/productByKeys',{
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(productKeys)
     })
     .then(res=>res.json())
     .then(data=>setCart(data))
    }, []);

     let thankyou;
     if(orderplaced){
     thankyou=<img src={happyimg} style={{textAlign:'center'}}/>
     }


    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd=><Reviewitem  
                    key={pd.key} 
                    removeProduct={removeProduct} 
                    product={pd}></Reviewitem>)
            }
            </div>
            {thankyou}

            <div className="cart-container">
             <Cart cart={cart}>
              <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>   
             </Cart>
           </div>

        </div>
    );
};

export default Review;
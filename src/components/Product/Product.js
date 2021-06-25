import React from 'react';
import './Product.css';
// get our fontawesome imports
import { faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = (props) => {
    const{name,img,seller,price,stock}=props.product;
    return (
        <div className="product">
         <div><img src={img}/></div>


         <div >
         <h4 className="product-name">{name}</h4><br/>
         <p><small>By : {seller}</small></p> 
         <p>${price}</p>
         <p><small>Only {stock} left in stock - Order Soon</small></p>
         <button onClick={()=>props.handleAddProduct(props.product)} className="main-button"> <FontAwesomeIcon icon={faShoppingCart} />  add to Cart</button>
         </div>   
         
        </div>
    );
};


export default Product;

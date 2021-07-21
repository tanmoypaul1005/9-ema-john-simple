import React from 'react';

const Reviewitem = (props) => {
    const {name,quantity,key,price}=props.product;
    const reviewitemstyle={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        padingBottom:'5px',
        marginLeft:'200px'
    };
    return (
        <div style={reviewitemstyle}>
        <h4 className="product-name">{name}</h4>
        <p>Quantity :{quantity}</p>
        <p><small>Price {price}</small></p>
        <button onClick={()=>props.removeProduct(key)} className="main-button">Remove</button>

        </div>
    );
};

export default Reviewitem;
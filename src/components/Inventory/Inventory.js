import React from 'react';

const Inventory = () => {
    const handleAddProduct=()=>{
        const product ={};
        fetch('http://localhost:5000/addProduct',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product) 
        })
    }
    return (
        <div>
        <form action="">
        <p>Name<span></span><input type="text" /></p>
        <p>Price<span></span><input type="text" /></p>
        <p>Quantity<span></span><input type="text" /></p>
        <p><span>ProductImage</span><input type="file" /></p>  
        <button onClick={handleAddProduct}>Add Product</button>  
        </form>
        </div>
    );
};

export default Inventory;
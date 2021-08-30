import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
const ProductDetail = () => {
    const {productkey}=useParams();
    const [product,setProduct]=useState({});
    const [loading,setLoading]=useState(true)
    document.title="Product Details"

    useEffect(() => {
    fetch('http://localhost:5000/product/'+productkey)   
    .then(res=>res.json())
    .then(data=>
        setProduct(data))
        setLoading(false);
    }, [productkey])

//    const product =fakeData.find(pd=>pd.key === productkey);

    return (
        <div>
            {
                loading?<p>Loading...</p>:<Product showAddToCart={false} product={product}></Product>
            }
            
        </div>
    );
};

export default ProductDetail;
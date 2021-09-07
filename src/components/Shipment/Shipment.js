import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import './Shipment.css';

const Shipment = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser]=useContext(UserContext);
    const [shipmentData,setShipmentData]=useState(null)
    const onSubmit = data =>{
      setShipmentData(data);
    };
    const handlePaymentSuccess=paymentId=>{
      const saveCart=getDatabaseCart();
      const orderDetails={...loggedInUser,products:saveCart,shipment:shipmentData,paymentId,orderTime:new Date()}
      fetch('http://localhost:5000/addOrder',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data =>{
        if(data){
          processOrder();
          alert('Your Order Placed Successfully');
        }
      })
    }
  
    console.log(watch("example")); 
  
 return (

<div className="row"> 
<div style={{display: shipmentData? 'none' :'block'}} className="col-md-6">
<form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

<input defaultValue={loggedInUser.name}  {...register("name", { required: true })}  placeholder="Your Name" />
{errors.name && <span className="error">Name is required</span>}

<input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
{errors.email && <span className="error">Email is required</span>}

<input  {...register("address", { required: true })} placeholder="Your Address"/>
{errors.addresses && <span className="error">Address is required</span>}

<input  {...register("phone", { required: true })} placeholder="Your Phone Number" />
{errors.phone && <span className="error">Phone Number is required</span>}


<input className="button" type="submit" />
</form>
</div>


<div style={{display: shipmentData ?'block' : 'none'}} className="col-md-6"> 
<h2>Please Pay For me</h2>
<ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment></div>
</div>
      
);
};

export default Shipment;
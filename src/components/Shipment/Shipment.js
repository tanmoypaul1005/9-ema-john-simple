import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { UserContext } from "../../App";
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser]=useContext(UserContext);
    const onSubmit = data => console.log('Form Submitted',data);
  
    console.log(watch("example")); 
  
    return (
      
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

        <input defaultValue={loggedInUser.emai}  {...register("name", { required: true })}  placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}
        
        <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required</span>}

        <input  {...register("address", { required: true })} placeholder="Your Address"/>
        {errors.addresses && <span className="error">Address is required</span>}

        <input  {...register("phone", { required: true })} placeholder="Your Phone Number" />
        {errors.phone && <span className="error">Phone Number is required</span>}
       

        <input className="button" type="submit" />
      </form>
    );
};

export default Shipment;
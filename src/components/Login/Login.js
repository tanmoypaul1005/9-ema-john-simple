
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSingIn, handleSingOut, initializeLoginFramework, resetpassword, signInWithEmailAndPassword } from "./loginManager";




function Login() {
const [newUser, setnewUser] = useState(false);
const [user, setUser] = useState({
  isSignedIn:false,
  name:'',
  email:'',
  password:'',
  photo:''
});

initializeLoginFramework();
const [loggedInUser, setLoggedInUser]=useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const GoogleSingIn=()=> {
  handleGoogleSingIn()
  .then(res=>{
  // setUser(res);
  // setLoggedInUser(res);
  handleResponse(res, false);
  })
}

const singOut=()=> {
  handleSingOut()
  .then(res=>{
    // setUser(res);
    // setLoggedInUser(res);
    handleResponse(res, false);
    }) 
}

const handleResponse = (res, redirect) =>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
      history.replace(from);
  }
}

const fbSingIn=()=> {
  handleFbSingIn()
  .then(res=>{
    handleResponse(res, true);
    }) 
}


const handleBlur=(e)=>{
let isFromValid=true;
if(e.target.name==='email'){
 isFromValid= /\S+@\S+\.\S+/.test(e.target.value);

}
if(e.target.name ==='password'){
const isPasswordValid= e.target.value.length>8;
const passwordHash= /\d{1}/.test(e.target.value);
isFromValid=isPasswordValid && passwordHash;
}
if(isFromValid){
  const newUserInfo={...user};
  newUserInfo[e.target.name]=e.target.value;
  setUser(newUserInfo);
}
}


const handleSubmit=(e)=>{
if(newUser&&user.email && user.password){
  createUserWithEmailAndPassword(user.name,user.email,user.password)
  .then(res=>{
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
    }) 
}

if(!newUser && user.email && user.password){
  signInWithEmailAndPassword(user.email,user.password)
  .then(res=>{
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
    }) 
}
e.preventDefault();
}





  return (
    <div style={{ textAlign: 'center'}}>
      {
        user.isSignedIn ?<button onClick={singOut}> Sign out</button> :  <button onClick={GoogleSingIn}> Sign in</button>
      }
     <br/>
     <button onClick={fbSingIn}>Sing In Using Facebook </button>
      {
      user.isSignedIn &&
      <div>
       <p>Welcome {user.name}</p>
       <p>Your Email : {user.email}</p>
       <img src={user.photo} alt=""></img>
      </div>
      } 

     <h1>Our Own Authentication</h1>
     <input type="checkbox" onChange={(()=>setnewUser(!newUser))} name ="newUser" />
     <label htmlFor="newUser">New User Sing UP</label>
     <form onSubmit={handleSubmit}>
      {newUser&&<input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />}
      <br/>
     <input type="text"  name="email" onBlur={handleBlur} placeholder="Your Email Adress" required />
     <br/>
     <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
     <br/>
     <input type="submit" value={newUser?'Sing UP':'Sing In'} />
     </form>
     <br/><button onClick={()=>resetpassword(user.email)}>Forget password</button>
     <p style={{color:'red'}}>{user.error}</p>
     {user.success && <p style={{color:'green'}}>User {newUser?'Created' :'Logged In'} success</p>}
    </div>
  );
}

export default Login;

import { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Inventory from './components/Inventory/Inventory';
import Login from "./components/Login/Login.js";
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from "./components/Shipment/Shipment";
import Shop from './components/Shop/Shop.js';


export const UserContext=createContext(); 


function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
   
    <h3>Email : {loggedInUser.email}</h3>  
    <Router>
    <Header></Header>

    <Switch>
    <Route path="/shop">
    <Shop></Shop>
    </Route>

    <Route path="/review">
    <Review></Review>
    </Route>

    <PrivateRoute path="/inventory">
    <Inventory></Inventory>
    </PrivateRoute>



    <PrivateRoute path="/shipment">
    <Shipment></Shipment>
    </PrivateRoute>

      
    <Route path="/login">
    <Login></Login>
    </Route>
    


    <Route exact path="/">
    <Shop></Shop>
    </Route> 

   <Route path="/product/:productkey">
   <ProductDetail></ProductDetail>
   </Route>

    <Route path="*">
    <NotFound></NotFound>
    </Route>
    </Switch>
    </Router>
  
    </UserContext.Provider>
  );
}

export default App;

import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from './components/BoardAdmin';
import BoardUser from './components/BoardUser';
import AddSellerComponent from './components/AddSellerComponent';
import ListSellerComponent from './components/ListSellerComponent';
import AddBuyerComponent from './components/AddBuyerComponent';
import ListBuyerComponent from './components/ListBuyerComponent';
import AddVehicleComponent from './components/AddVehicleComponent';
import ListVehicleComponent from './components/ListVehicleComponent';
import ListMyVehiclesComponent from './components/ListMyVehiclesComponent';
import AddVehicleToSellerBuyerComponent from './components/AddVehicleToSellerBuyerComponent';
import SellerInfoComponent from './components/SellerInfoComponent';
import AddTransferComponent from './components/AddTransferComponent';
import BuyerInfoComponent from './components/BuyerInfoComponent';
import ListBuyerForSellerComponent from './components/ListBuyerForSellerComponent';
import BuyerInfoForAdminComponent from './components/BuyerInfoForAdmin';
import ListMyTransferComponent from './components/ListMyTransferComponenent';
import UpdateTransactionComponent from './components/UpdateTransactionComponent';
import ListTransactionComponent from './components/ListTransactionComponent';
import Footer from './components/Footer';
import ListOfficesComponent from './components/ListOfficesComponent';
import AddGovOfficeComponent from './components/AddGovOfficeComponent';


const App = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const[showSeller, setShowSeller] = useState(false);
  const[showBuyer, setShowBuyer] = useState(false);



  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
      setShowBuyer(user.roles.includes("ROLE_BUYER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  
  return (

    <Router>
    <div>
      
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <Link to={"/"} className="navbar-brand">
          Hua
        </Link>
        <div className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/sellers"} className="nav-link">
                Sellers
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/buyers"} className="nav-link">
                Buyers
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/vehicles"} className="nav-link">
                Vehicles
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/offices"} className="nav-link">
                Gov Officies
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                Transfers
              </Link>
            </li>
          )}

          {showSeller && (
              <li className="nav-item">
                <Link to={"/sellers"} className="nav-link">
                  Sellers
                </Link>
              </li>
            )}
       
          {showBuyer && (
            <li className="nav-item">
              <Link to={"/buyers"} className="nav-link">
                Buyers
              </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className='btn btn-outline-secondary'><Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link></button>
          </li>
          <li className="nav-item">
            <button class="btn btn-outline-danger" style = {{marginLeft:"10px"}}><a href="/login" className="nav-link" onClick={logOut}>
              Log Out
            </a></button>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <button class="btn btn-outline-success" style = {{marginLeft:"10px"}}>
            <Link to={"/login"} className="nav-link" >
              Login
            </Link></button>
          </li>
          <li className="nav-item">
            <button class="btn btn-outline-secondary" style = {{marginLeft:"10px"}}><Link to={"/signup"} className="nav-link">
              Sign Up
            </Link></button>
          </li>
        </div>
        )}
      </nav>
    



    <div>
    
        <Header />
        <Footer />
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route index element={<Home />} />
          <Route path="/sellers" element={<ListSellerComponent />}></Route>
          <Route path="/add-seller" element={<AddSellerComponent />}></Route>
          <Route path="/edit-seller/:id" element={<AddSellerComponent />}></Route>
          <Route path="/buyers" element={<ListBuyerComponent />}></Route>
          <Route path="/add-buyer" element={<AddBuyerComponent />}></Route>
          <Route path="/edit-buyer/:id" element={<AddBuyerComponent />}></Route>
          <Route path="/vehicles" element={<ListVehicleComponent />}></Route>
          <Route path="/add-vehicle" element={<AddVehicleComponent />}></Route>
          <Route path="/edit-vehicle/:id" element={<AddVehicleComponent />}></Route>
          <Route path="/:id/seller" element={<ListSellerComponent />}></Route>
          <Route path="sellers/:id/MyVehicles" element={<ListMyVehiclesComponent />}></Route>
          <Route path="/vehicle" element={<ListMyVehiclesComponent />}></Route>
          <Route path="/sellers/:id" element={<SellerInfoComponent />} />
          <Route path="/sellers/:sellerId/buyers" element={<ListBuyerForSellerComponent />}></Route>
          <Route path="/sellers/:sellerId/buyers/:buyerId" element={<BuyerInfoComponent />}></Route>
          <Route path="/sellers/:sellerId/buyers/:buyerId/vehicle" element={<AddVehicleToSellerBuyerComponent />}></Route>
          <Route path="/buyers/:buyerId" element={<BuyerInfoForAdminComponent />}></Route>
          <Route path="buyers/:id/MyVehicles" element={<ListMyVehiclesComponent />}></Route>
          <Route path="sellers/:sellerId/MyVehicles/:vehicleId/transfer" element={<AddTransferComponent/>}></Route>
          <Route path="sellers/:id/MyTransactions" element={<ListMyTransferComponent />}></Route>
          <Route path="buyers/:id/MyTransactions" element={<ListMyTransferComponent />}></Route>
          <Route path="/transactions/update-transfer/:id" element={<UpdateTransactionComponent />}></Route>
          <Route path="/transactions" element={<ListTransactionComponent />}></Route>
          <Route path="/offices" element={<ListOfficesComponent />}></Route>
          <Route path="offices/add-office" element={<AddGovOfficeComponent />}></Route>
          <Route path="offices/edit-office/:id" element={<AddGovOfficeComponent />}></Route>
          


      </Routes>
      
    </div>
  </div>
  </Router>
  );
}

export default App;

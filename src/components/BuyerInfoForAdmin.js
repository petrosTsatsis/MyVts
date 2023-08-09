import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyerService from "../services/BuyerService";
import SellerService from "../services/SellerService";
import AuthService from "../services/AuthService";

const BuyerInfoForAdminComponent = () => {
  const [buyer, setBuyer] = useState(null);
  const [seller, setSeller] = useState(null);
  const [showBuyer, setShowBuyer] = useState(false);
  const { buyerId } = useParams();

  useEffect(() => {
    fetchBuyerInfo();
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowBuyer(user.roles.includes("ROLE_BUYER"));
    }
  }, []);

  const fetchBuyerInfo = () => {
    BuyerService.getBuyerById(buyerId)
      .then((response) => {
        setBuyer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Buyer Information</h2>
      {buyer ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th> Buyer Id </th>
              <th> Buyer First Name </th>
              <th> Buyer Last Name </th>
              <th> Buyer Email </th>
              <th> Buyer VAT number </th>
              <th> Buyer Phone number </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {buyer.id} </td>
              <td> {buyer.firstName} </td>
              <td> {buyer.lastName} </td>
              <td> {buyer.email} </td>
              <td> {buyer.vatnum} </td>
              <td> {buyer.phoneNum} </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading buyer information...</p>
      )}
      {buyer && (
        <>
          {showBuyer && (
            <Link
              className="btn btn-warning"
              style={{ marginLeft: "10px" }}
              to={`/buyers/${buyer.id}/MyVehicles`}
            >
              MyVehicles
            </Link>
          )}

          {showBuyer && (
            <Link
              className="btn btn-warning"
              style={{ marginLeft: "10px" }}
              to={`/buyers/${buyer.id}/MyTransactions`}
            >
              MyTransfers
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default BuyerInfoForAdminComponent;

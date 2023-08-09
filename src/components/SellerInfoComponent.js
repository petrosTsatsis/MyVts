import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SellerService from "../services/SellerService";
import AuthService
 from "../services/AuthService";
const InfoComponent = () => {
  const [sellers, setSellers] = useState([]);
  const [showSeller, setShowSeller] = useState(true);
  const { id } = useParams();
  const [seller, setSeller] = useState(false);

  useEffect(() => {
    fetchSellerInfo();
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const fetchSellerInfo = () => {
    SellerService.getSellerById(id)
      .then((response) => {
        setSeller(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Seller Information</h2>
      {seller ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th> Seller Id </th>
              <th> Seller First Name </th>
              <th> Seller Last Name </th>
              <th> Seller Email </th>
              <th> Seller VAT number </th>
              <th> Seller Phone number </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {seller.id} </td>
              <td> {seller.firstName} </td>
              <td> {seller.lastName} </td>
              <td> {seller.email} </td>
              <td> {seller.vatnum} </td>
              <td> {seller.phoneNum} </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading seller information...</p>
      )}
      {seller && (
        <>
          {showSeller && (
            <Link
              className="btn btn-warning"
              style={{ marginLeft: "10px" }}
              to={`/sellers/${seller.id}/MyVehicles`}
            >
              MyVehicles
            </Link>
          )}

          {showSeller && (
            <Link
              className="btn btn-warning"
              style={{ marginLeft: "10px" }}
              to={`/sellers/${seller.id}/MyTransactions`}
            >
              MyTransfers
            </Link>
          )}

          {showSeller && (
            <Link
              className="btn btn-warning"
              style={{ marginLeft: "10px" }}
              to={`/sellers/${seller.id}/buyers`}
            >
              Buyers
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default InfoComponent;

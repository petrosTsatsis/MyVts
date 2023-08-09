import React, { useEffect, useState } from "react";
import BuyerService from "../services/BuyerService";
import { Link, useParams } from "react-router-dom";
import AuthService from "../services/AuthService";
import SellerService from "../services/SellerService";

const ListBuyerForSellerComponent = () => {
  const [buyers, setBuyers] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const [showSeller, setShowSeller] = useState(false);
  const { sellerId } = useParams();

  useEffect(() => {
    getAllBuyersForSeller();

    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowBuyer(user.roles.includes("ROLE_BUYER"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const getAllBuyersForSeller = () => {
    SellerService.getAllBuyersForSeller()
      .then((response) => {
        setBuyers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Buyers</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <th> Buyer Id </th>
          <th> Buyer First Name </th>
          <th> Buyer Last Name </th>
          {(showAdminBoard || showSeller) && <th> Actions </th>}
        </thead>
        <tbody>
          {buyers.map((buyers) => (
            <tr key={buyers.id}>
              <td> {buyers.id} </td>
              <td> {buyers.firstName} </td>
              <td> {buyers.lastName} </td>
              <td>
                {showSeller && (
                  <Link
                    className="btn btn-outline-warning"
                    style={{ marginLeft: "10px" }}
                    to={`/sellers/${sellerId}/buyers/${buyers.id}`}
                  >
                    Info
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBuyerForSellerComponent;

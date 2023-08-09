import React, { useEffect, useState } from "react";
import SellerService from "../services/SellerService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const ListSellerComponent = () => {
  const [sellers, setSellers] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showSeller, setShowSeller] = useState(false);

  useEffect(() => {
    getAllSellers();

    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const getAllSellers = () => {
    SellerService.getAllSellers()
      .then((response) => {
        setSellers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSeller = (id) => {
    SellerService.deleteSeller(id)
      .then((response) => {
        getAllSellers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Sellers</h2>
      {showAdminBoard && (
        <Link to="/add-seller" className="btn btn-primary mb-2">
          {" "}
          Add Seller{" "}
        </Link>
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <th> Seller Id </th>
          <th> Seller First Name </th>
          <th> Seller Last Name </th>
          {(showAdminBoard || showSeller) && <th> Actions </th>}
        </thead>
        <tbody>
          {sellers.map((sellers) => (
            <tr key={sellers.id}>
              <td> {sellers.id} </td>
              <td> {sellers.firstName} </td>
              <td> {sellers.lastName} </td>
              <td>
                {showAdminBoard && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/edit-seller/${sellers.id}`}
                  >
                    {" "}
                    Update
                  </Link>
                )}
                {showAdminBoard && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteSeller(sellers.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button>
                )}
                {showSeller && (
                  <Link
                    className="btn btn-outline-warning"
                    style={{ marginLeft: "10px" }}
                    to={`/sellers/${sellers.id}`}
                  >
                    {" "}
                    Info
                  </Link>
                )}
                {showAdminBoard && (
                  <Link
                    className="btn btn-outline-warning"
                    style={{ marginLeft: "10px" }}
                    to={`/sellers/${sellers.id}`}
                  >
                    {" "}
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

export default ListSellerComponent;

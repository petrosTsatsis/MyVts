import React, { useEffect, useState } from "react";
import BuyerService from "../services/BuyerService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const ListBuyerComponent = () => {
  const [buyers, setBuyers] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const [showSeller, setShowSeller] = useState(false);

  useEffect(() => {
    getAllBuyers();

    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowBuyer(user.roles.includes("ROLE_BUYER"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const getAllBuyers = () => {
    BuyerService.getAllBuyers()
      .then((response) => {
        setBuyers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBuyer = (id) => {
    BuyerService.deleteBuyer(id)
      .then((response) => {
        getAllBuyers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Buyers</h2>
      {showAdminBoard && (
        <Link to="/add-buyer" className="btn btn-primary mb-2">
          {" "}
          Add Buyer{" "}
        </Link>
      )}

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
                {showAdminBoard && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/edit-buyer/${buyers.id}`}
                  >
                    {" "}
                    Update
                  </Link>
                )}
                {showAdminBoard && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteBuyer(buyers.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button>
                )}
                <Link
                  className="btn btn-outline-warning"
                  style={{ marginLeft: "10px" }}
                  to={`/buyers/${buyers.id}`}
                >
                  {" "}
                  Info
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBuyerComponent;

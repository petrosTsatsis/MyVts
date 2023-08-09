import React, { useEffect, useState } from "react";
import VehicleService from "../services/VehicleService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import TransactionService from "../services/TransactionService";

const ListTransactionComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showSeller, setShowSeller] = useState(false);

  useEffect(() => {
    getAllTransactions();

    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const getAllTransactions = () => {
    TransactionService.getAllTransactions()
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTransaction = (id) => {
    TransactionService.deleteTransaction(id)
      .then((response) => {
        getAllTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setStatusColor = (status) => {
    if (status === "pending") {
      return "gold";
    } else if (status === "completed") {
      return "green";
    } else if (status === "canceled") {
      return "red";
    }
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Transactions</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <th> Transfer Id </th>
          <th> Status </th>
          <th> Address </th>
          <th> Buyer VAT </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {transactions.map((transactions) => (
            <tr key={transactions.id}>
              <td> {transactions.id} </td>
              <td style={{ color: setStatusColor(transactions.status) }}>
                {" "}
                {transactions.status}{" "}
              </td>
              <td> {transactions.address}</td>
              <td> {transactions.buyerVAT} </td>
              <td>
                {showAdminBoard && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/transactions/update-transfer/${transactions.id}`}
                  >
                    {" "}
                    Update
                  </Link>
                )}
                {showAdminBoard && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTransaction(transactions.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTransactionComponent;

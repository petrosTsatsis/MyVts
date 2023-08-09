import React, { useEffect, useState } from 'react';
import SellerService from '../services/SellerService';
import { useParams } from 'react-router-dom';
import BuyerService from '../services/BuyerService';
import AuthService from '../services/AuthService';
import TransactionService from '../services/TransactionService';
import { Link } from 'react-router-dom';

const ListMyTransferComponent = () => {
  const [transactions, setTransaction] = useState([]);
  const [showBuyer, setShowBuyer] = useState(false);
  const [showSeller, setShowSeller] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowSeller(user.roles.includes('ROLE_SELLER'));
      setShowBuyer(user.roles.includes('ROLE_BUYER'));
    }
    if (showSeller) {
      getAllTransactionsSellers(id);
    } else if (showBuyer) {
      getAllTransactionsBuyers(id);
    }
  }, [id, showBuyer, showSeller]);

  const getAllTransactionsBuyers = (id) => {
    BuyerService.getBuyerTransactions(id)
      .then((response) => {
        setTransaction(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllTransactionsSellers = (id) => {
    SellerService.getSellerTransactions(id)
      .then((response) => {
        setTransaction(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptTransaction = (transactionId) => {
    TransactionService.getTransactionById(transactionId)
      .then((response) => {
        const transactionData = response.data;
        transactionData.status = 'completed'; 
        TransactionService.update(transactionId, transactionData)
          .then((response) => {
            console.log(response.data);

            if (showBuyer) {
              getAllTransactionsBuyers(id);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectTransaction = (transactionId) => {
    TransactionService.getTransactionById(transactionId)
      .then((response) => {
        const transactionData = response.data;
        transactionData.status = 'canceled';
        TransactionService.update(transactionId, transactionData)
          .then((response) => {
            console.log(response.data);
            
            if (showBuyer) {
              getAllTransactionsBuyers(id);
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
      <h2 className="text-center"> MyTransfers </h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Transfer Id </th>
            <th> Status </th>
            <th> Address </th>
            <th> Buyer VAT </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td> {transaction.id} </td>
              <td style={{ color: setStatusColor(transaction.status) }}> {transaction.status} </td>
              <td> {transaction.address} </td>
              <td> {transaction.buyerVAT} </td>
              <td>
                {showSeller && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/transactions/update-transfer/${transaction.id}`} 
                  >
                    Update Transfer
                  </Link>
                )}
                {showBuyer && transaction.status === "pending" && (
                  <>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => acceptTransaction(transaction.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => rejectTransaction(transaction.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMyTransferComponent;
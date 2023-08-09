import React, { useEffect, useState } from "react";
import SellerService from "../services/SellerService";
import { useParams, useNavigate } from "react-router-dom";
import BuyerService from "../services/BuyerService";
import AuthService from "../services/AuthService";
import TransactionService from "../services/TransactionService";
import OfficeService from "../services/OfficeService"; // Import OfficeService
import { Link } from "react-router-dom";

const UpdateTransactionComponent = () => {
  const [transaction, setTransaction] = useState([]);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [buyerVAT, setBuyerVAT] = useState();
  const [buyerId, setBuyerId] = useState();
  const [offices, setOffices] = useState([]); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    
    OfficeService.getAllOffices()
      .then((response) => {
        setOffices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (id) {
      TransactionService.getTransactionById(id)
        .then((response) => {
          setStatus(response.data.status);
          setAddress(response.data.address);
          setBuyerVAT(response.data.buyerVAT);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const updateTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      status: status,
      address: address,
      buyerVAT: buyerVAT,
      buyerId: buyerId,
    };

    if (id) {
      TransactionService.update(id, newTransaction)
        .then((response) => {
          console.log(response.data);
          navigate("/sellers");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Update Transaction</h2>
            <div className="card-body">
              <form>
              <div className="form-group mb-2">
                  <label className="form-label"> Status :</label>
                  <input
                    type="text"
                    placeholder="Enter Status"
                    name="status"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  ></input>
                </div>
                
                <div className="form-group mb-2">
                  <label className="form-label"> Address:</label>
                  <select
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  >
                    <option value="">Select an address</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.address}>
                        {office.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Buyer VAT Number:</label>
                  <input
                    type="text"
                    placeholder="Enter Buyer VAT Number"
                    name="buyerVAT"
                    className="form-control"
                    value={buyerVAT}
                    onChange={(e) => setBuyerVAT(e.target.value)}
                  ></input>
                </div>     

                <button
                  className="btn btn-outline-success"
                  onClick={(e) => updateTransaction(e)}
                >
                  {" "}
                  Submit
                </button>
                <Link
                  to={`/sellers`}
                  className="btn btn-outline-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransactionComponent;
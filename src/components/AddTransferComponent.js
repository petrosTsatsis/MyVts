import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SellerService from "../services/SellerService";
import OfficeService from "../services/OfficeService";

const AddTransferComponent = () => {
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [buyerVAT, setBuyerVAT] = useState();
  const [offices, setOffices] = useState([]);
  const { sellerId } = useParams();
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    OfficeService.getAllOffices()
      .then((response) => {
        setOffices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createTransfer = (e) => {
    e.preventDefault();

    const transaction = { status, address, buyerVAT };

    SellerService.createTransfer(sellerId, vehicleId, transaction)
      .then((response) => {
        console.log(response.data);
        navigate(`/sellers/${sellerId}/MyTransactions`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("This vehicle is already part of a Transfer!");
        }
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> New Transfer</h2>
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
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Address :</label>
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
                  />
                </div>

                <button
                  className="btn btn-outline-success"
                  onClick={(e) => createTransfer(e)}
                >
                  Submit
                </button>
                <Link
                  to={`/sellers/${sellerId}/MyTransactions`}
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

export default AddTransferComponent;
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SellerService from "../services/SellerService";
import BuyerService from "../services/BuyerService";

const AddVehicleToSellerComponent = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensenumber, setLicensenumber] = useState("");
  const [registernumber, setRegisternumber] = useState("");
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const { buyerId } = useParams();

  const saveVehicle = (e) => {
    e.preventDefault();

    const vehicle = { brand, model, year, licensenumber, registernumber };

    SellerService.addVehicle(sellerId, buyerId, vehicle)
      .then((response) => {
        console.log(response.data);
        navigate(`/sellers/${sellerId}/MyVehicles`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Add MyVehicle</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Brand :</label>
                  <input
                    type="text"
                    placeholder="Enter Brand"
                    name="brand"
                    className="form-control"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Model :</label>
                  <input
                    type="text"
                    placeholder="Enter Model"
                    name="model"
                    className="form-control"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Year :</label>
                  <input
                    type="text"
                    placeholder="Enter Year"
                    name="year"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> License Number :</label>
                  <input
                    type="text"
                    placeholder="Enter the License Number"
                    name="licensenumber"
                    className="form-control"
                    value={licensenumber}
                    onChange={(e) => setLicensenumber(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Register Number :</label>
                  <input
                    type="text"
                    placeholder="Enter the Register Number"
                    name="registernumber"
                    className="form-control"
                    value={registernumber}
                    onChange={(e) => setRegisternumber(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-outline-success"
                  onClick={(e) => saveVehicle(e)}
                >
                  {" "}
                  Submit
                </button>
                <Link
                  to="/sellers/${sellerID}/MyVehicles"
                  className="btn btn-outline-danger"
                  style={{ marginLeft: "10px" }}
                >
                  {" "}
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

export default AddVehicleToSellerComponent;

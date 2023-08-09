import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import VehicleService from "../services/VehicleService";
import AuthService from "../services/AuthService";

const AddVehicleComponent = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [licensenumber, setLicensenumber] = useState("");
  const [registernumber, setRegisternumber] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateVehicle = (e) => {
    e.preventDefault();

    const vehicle = { brand, model, year, licensenumber, registernumber };

    if (id) {
      VehicleService.update(id, vehicle)
        .then((response) => {
          console.log(response.data);
  
          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_SELLER")) {
            navigate("/sellers");
          } else if (user.roles.includes("ROLE_ADMIN")) {
            navigate("/vehicles");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      VehicleService.save(vehicle)
        .then((response) => {
          console.log(response.data);

          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_SELLER")) {
            navigate("/sellers");
          } else if (user.roles.includes("ROLE_ADMIN")) {
            navigate("/vehicles");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  };

  useEffect(() => {
    if (id) {
      VehicleService.getVehicleById(id)
        .then((response) => {
          setBrand(response.data.brand);
          setModel(response.data.model);
          setYear(response.data.year);
          setLicensenumber(response.data.licensenumber);
          setRegisternumber(response.data.registernumber);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const title = () => {
    if (id) {
      return <h2 className="text-center"> Update Vehicle</h2>;
    } else {
      return <h2 className="text-center"> Add Vehicle</h2>;
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
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
                  onClick={(e) => saveOrUpdateVehicle(e)}
                >
                  {" "}
                  Submit
                </button>
                <Link
                  to="/vehicles"
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

export default AddVehicleComponent;

import React, { useState , useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OfficeService from "../services/OfficeService";
import AuthService from "../services/AuthService";

const AddGovOfficeComponent = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOffice = (e) => {
    e.preventDefault();

    const officeData = { address };

    if (id) {
      OfficeService.update(id, officeData)
        .then((response) => {
          console.log(response.data);
 
          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_ADMIN")) {
            navigate("/offices");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      OfficeService.save(officeData)
        .then((response) => {
          console.log(response.data);

          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_ADMIN")) {
            navigate("/offices");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      OfficeService.getOfficeById(id)
        .then((response) => {
          setAddress(response.data.address);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  const title = () => {
    if (id) {
      return <h2 className="text-center"> Update Office</h2>;
    } else {
      return <h2 className="text-center"> Add Office</h2>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Address :</label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-outline-success"
                  onClick={(e) => saveOffice(e)}
                >
                  {" "}
                  Submit
                </button>
                <Link
                  to="/offices"
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

export default AddGovOfficeComponent;
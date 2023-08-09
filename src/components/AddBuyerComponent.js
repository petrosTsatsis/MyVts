import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BuyerService from "../services/BuyerService";

const AddBuyerComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [vatnum, setVatnum] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateBuyer = (e) => {
    e.preventDefault();

    const buyer = { firstName, lastName, email, vatnum, phoneNum };

    if (id) {
      BuyerService.update(id, buyer)
        .then((response) => {
          console.log(response.data);

          navigate("/buyers");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      BuyerService.save(buyer)
        .then((response) => {
          console.log(response.data);

          navigate("/buyers");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      BuyerService.getBuyerById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setVatnum(response.data.vatnum);
          setPhoneNum(response.data.phoneNum);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const title = () => {
    if (id) {
      return <h2 className="text-center"> Update Buyer</h2>;
    } else {
      return <h2 className="text-center"> Add Buyer</h2>;
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
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Email :</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> VAT Number :</label>
                  <input
                    type="text"
                    placeholder="Enter VAT number"
                    name="vatnum"
                    className="form-control"
                    value={vatnum}
                    onChange={(e) => setVatnum(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Phone Number :</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNum"
                    className="form-control"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-outline-success"
                  onClick={(e) => saveOrUpdateBuyer(e)}
                >
                  {" "}
                  Submit
                </button>
                <Link
                  to="/buyers"
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

export default AddBuyerComponent;

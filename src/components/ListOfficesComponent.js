import React, { useEffect, useState } from "react";
import OfficeService from "../services/OfficeService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const ListOfficesComponent = () => {
  const [offices, setOffices] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  
  useEffect(() => {
    getAllOffices();

    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const getAllOffices = () => {
    OfficeService.getAllOffices()
      .then((response) => {
        setOffices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOffice = (id) => {
    OfficeService.deleteOffice(id)
      .then((response) => {
        getAllOffices();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Offices</h2>
      {showAdminBoard && (
        <Link to="/offices/add-office" className="btn btn-primary mb-2">
          {" "}
          Add Office{" "}
        </Link>
      )}
      <table className="table table-bordered table-striped">
        <thead>
          <th> Office Id </th>
          <th> Address </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {offices.map((office) => (
            <tr key={office.id}>
              <td> {office.id} </td>
              <td> {office.address} </td>
              <td>
                {showAdminBoard && (
                  <Link
                  className="btn btn-outline-success"
                  to={`/offices/edit-office/${office.id}`}
                >
                  {" "}
                  Update
                </Link>
                )}
                {showAdminBoard && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteOffice(office.id)}
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

export default ListOfficesComponent;
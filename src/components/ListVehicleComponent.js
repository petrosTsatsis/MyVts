import React, { useEffect, useState } from "react";
import VehicleService from "../services/VehicleService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const ListVehicleComponent = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showSeller, setShowSeller] = useState(false);

  useEffect(() => {
    getAllVehicles();

    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowSeller(user.roles.includes("ROLE_SELLER"));
    }
  }, []);

  const getAllVehicles = () => {
    VehicleService.getAllVehicles()
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteVehicle = (id) => {
    VehicleService.deleteVehicle(id)
      .then((response) => {
        getAllVehicles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Vehicles</h2>
      {showAdminBoard && (
        <Link to="/add-vehicle" className="btn btn-primary mb-2">
          {" "}
          Add Vehicle{" "}
        </Link>
      )}
      <table className="table table-bordered table-striped">
        <thead>
          <th> Vehicle Id </th>
          <th> Brand </th>
          <th> Model </th>
          <th> Year </th>
          <th> License Number </th>
          <th> Register number </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {vehicles.map((vehicles) => (
            <tr key={vehicles.id}>
              <td> {vehicles.id} </td>
              <td> {vehicles.brand} </td>
              <td> {vehicles.model} </td>
              <td> {vehicles.year} </td>
              <td> {vehicles.licensenumber} </td>
              <td> {vehicles.registernumber} </td>
              <td>
                {showAdminBoard && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/edit-vehicle/${vehicles.id}`}
                  >
                    {" "}
                    Update
                  </Link>
                )}
                {showAdminBoard && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteVehicle(vehicles.id)}
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

export default ListVehicleComponent;

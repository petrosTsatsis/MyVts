import React, { useEffect, useState } from "react";
import SellerService from "../services/SellerService";
import { useParams } from "react-router-dom";
import BuyerService from "../services/BuyerService";
import AuthService from "../services/AuthService";
import VehicleService from "../services/VehicleService";
import { Link } from "react-router-dom";

const ListMyVehiclesComponent = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showBuyer, setShowBuyer] = useState(false);
  const [showSeller, setShowSeller] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowSeller(user.roles.includes("ROLE_SELLER"));
      setShowBuyer(user.roles.includes("ROLE_BUYER"));
    }
    if (showSeller) {
      getAllVehiclesSellers(id);
    } else if (showBuyer) {
      getAllVehiclesBuyers(id);
    }
  }, [id, showBuyer, showSeller]);

  const getAllVehiclesBuyers = (id) => {
    BuyerService.getBuyerVehicles(id)
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllVehiclesSellers = (id) => {
    SellerService.getSellerVehicles(id)
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Vehicles</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Vehicle Id </th>
            <th> Brand </th>
            <th> Model </th>
            <th> Year </th>
            <th> License Number </th>
            <th> Register number </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td> {vehicle.id} </td>
              <td> {vehicle.brand} </td>
              <td> {vehicle.model} </td>
              <td> {vehicle.year} </td>
              <td> {vehicle.licensenumber} </td>
              <td> {vehicle.registernumber} </td>
              <td>
                {showSeller && (
                  <Link
                    className="btn btn-outline-success"
                    to={`/sellers/${id}/MyVehicles/${vehicle.id}/transfer`}
                  >
                    Begin Transfer
                  </Link>
                )}
                {showSeller && (
                  <Link
                    className="btn btn-outline-success"
                    style={{ marginLeft: "10px" }}
                    to={`/edit-vehicle/${vehicle.id}`}
                  >
                    Update Vehicle
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMyVehiclesComponent;

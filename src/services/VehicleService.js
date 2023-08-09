import axios from "axios";
import authHeader from "./authHeader";

const VEHICLE_REST_API_URL = "http://localhost:8080/vehicles/";

class VehicleService {
  getAllVehicles() {
    return axios.get(VEHICLE_REST_API_URL + "", { headers: authHeader() });
  }

  save(vehicle) {
    return axios.post(VEHICLE_REST_API_URL + "add-vehicle", vehicle, {
      headers: authHeader(),
    });
  }

  getVehicleById(id) {
    return axios.get(VEHICLE_REST_API_URL + id, { headers: authHeader() });
  }

  deleteVehicle(id) {
    return axios.delete(VEHICLE_REST_API_URL + "" + id, {
      headers: authHeader(),
    });
  }

  update(id, vehicle) {
    return axios.put(VEHICLE_REST_API_URL + "edit-vehicle/" + id, vehicle, {
      headers: authHeader(),
    });
  }
}

export default new VehicleService();

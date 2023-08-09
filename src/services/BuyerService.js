import axios from "axios";
import authHeader from "./authHeader";

const BUYER_REST_API_URL = "http://localhost:8080/buyers/";

class BuyerService {
  getAllBuyers() {
    return axios.get(BUYER_REST_API_URL + "", { headers: authHeader() });
  }

  save(buyer) {
    return axios.post(BUYER_REST_API_URL + "add-buyer", buyer, {
      headers: authHeader(),
    });
  }

  getBuyerById(id) {
    return axios.get(BUYER_REST_API_URL + id, { headers: authHeader() });
  }

  deleteBuyer(id) {
    return axios.delete(BUYER_REST_API_URL + "" + id, {
      headers: authHeader(),
    });
  }

  addVehicle(id, vehicle) {
    return axios.post(BUYER_REST_API_URL + id + "/vehicles", vehicle, {
      headers: authHeader(),
    });
  }

  getBuyerVehicles(id) {
    return axios.get(BUYER_REST_API_URL + id + "/MyVehicles", {
      headers: authHeader(),
    });
  }

  update(id, buyer) {
    return axios.put(BUYER_REST_API_URL + "edit-buyer/" + id, buyer, {
      headers: authHeader(),
    });
  }

  getBuyerTransactions(id) {
    return axios.get(BUYER_REST_API_URL + id + "/MyTransactions", {
      headers: authHeader(),
    });
  }
}

export default new BuyerService();

import axios from "axios";
import authHeader from "./authHeader";

const SELLER_REST_API_URL = "http://localhost:8080/sellers/";

class SellerService {
  getAllSellers() {
    return axios.get(SELLER_REST_API_URL + "", { headers: authHeader() });
  }

  save(seller) {
    return axios.post(SELLER_REST_API_URL + "add-seller", seller, {
      headers: authHeader(),
    });
  }

  getSellerById(id) {
    return axios.get(SELLER_REST_API_URL + id, { headers: authHeader() });
  }

  getAllBuyersForSeller(id) {
    return axios.get(SELLER_REST_API_URL + id + "/buyers", {
      headers: authHeader(),
    });
  }

  getBuyerForSeller(sellerId, buyerId) {
    return axios.get(SELLER_REST_API_URL + sellerId + "/buyers/" + buyerId, {
      headers: authHeader(),
    });
  }

  deleteSeller(id) {
    return axios.delete(SELLER_REST_API_URL + "" + id, {
      headers: authHeader(),
    });
  }

  addVehicle(sellerId, buyerId, vehicle) {
    return axios.post(
      SELLER_REST_API_URL + sellerId + "/buyers/" + buyerId + "/vehicle",
      vehicle,
      { headers: authHeader() }
    );
  }

  getSellerVehicles(id) {
    return axios.get(SELLER_REST_API_URL + id + "/MyVehicles", {
      headers: authHeader(),
    });
  }

  update(id, seller) {
    return axios.put(SELLER_REST_API_URL + "edit-seller/" + id, seller, {
      headers: authHeader(),
    });
  }

  getSellerTransactions(id) {
    return axios.get(SELLER_REST_API_URL + id + "/MyTransactions", {
      headers: authHeader(),
    });
  }

  createTransfer(sellerId, vehicleId, transaction) {
    return axios.post(
      SELLER_REST_API_URL + sellerId + "/MyVehicles/" + vehicleId + "/transfer",
      transaction,
      { headers: authHeader() }
    );
  }
}

export default new SellerService();

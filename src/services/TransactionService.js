import axios from "axios";
import authHeader from "./authHeader";

const TRANSACTION_REST_API_URL = "http://localhost:8080/transactions";

class TransactionService {
  getAllTransactions() {
    return axios.get(TRANSACTION_REST_API_URL + "", { headers: authHeader() });
  }

  getTransactionById(id) {
    return axios.get(TRANSACTION_REST_API_URL + "/" + id, {
      headers: authHeader(),
    });
  }

  deleteTransaction(id) {
    return axios.delete(TRANSACTION_REST_API_URL + "/" + id, {
      headers: authHeader(),
    });
  }

  update(id, transaction) {
    return axios.put(
      TRANSACTION_REST_API_URL + "/update-transfer/" + id,
      transaction,
      { headers: authHeader() }
    );
  }
}

export default new TransactionService();
